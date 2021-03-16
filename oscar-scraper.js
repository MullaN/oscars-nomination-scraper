const { JSDOM } = require("jsdom")
const axios = require('axios')
const fs = require('fs')

const getData = async () => {
    try {
        const { data } = await axios.get("https://www.oscars.org/oscars/ceremonies/2021");
        return data
    } catch (error) {
        throw error
    }
}

const parseData = async () => {
    let pageBody
    await getData().then(body => pageBody = body)
    const dom = new JSDOM(pageBody)
    const {document} = dom.window
    let awards = document.querySelectorAll('div.view-grouping-header > h2')
    awards = Array.from(awards).map(award => award.innerHTML)
    let awardDivs = document.querySelectorAll('div.view-grouping')

    // narrow view-grouping divs to ones matching awards
    awardDivs = Array.from(awardDivs).filter(div => awards.some(award => div.querySelector('h2') && div.querySelector('h2').innerHTML === award))
    let movies = []
    let id = 0
    let movie = ""
    let people = ""
    let nominees
    let contents
    let order = 0
    let category = ""
    awardDivs.forEach(div => {
        category = div.querySelector('h2').textContent
        // handle swapped order for actor/actress categories
        if (category.startsWith('Actor') || category.startsWith('Actress')){
            order = 1
        } else {
            order = 0
        }

        //grab nominee divs and remove empty content
        contents = Array.from(div.getElementsByClassName('field-content')).filter(content => content.innerHTML !== "")
        nominees = contents.map(nominee => nominee.textContent)

        for(let i = 0; i < nominees.length; i += 2){
            if (category.includes('(Original Song)')){
                movie = nominees[i+1].substring(5,nominees[i+1].indexOf(";"))
                people = nominees[i] + nominees[i+1].substring(nominees[i+1].indexOf(";"))
            } else if (i % 2 === order){
                movie = nominees[i]
                people = nominees[i+1]
            } else {
                people = nominees[i]
                movie = nominees[i+1]
            }
            movie = movie.replace('\n', '')
            people = people.replace('\n', '')
            
            if (movies.filter(mov => mov.title === movie).length){
                movies[movies.filter(mov => mov.title === movie)[0].id]['nominations'].push({category, people})
            } else {
                movies.push({id, title: movie, nominations: [{category, people}]})
                id++
            }
        }
    })
    fs.writeFile('oscar-data.js', 'const oscarData = ' + JSON.stringify(movies) +'\nmodule.exports = oscarData', function (err) {
        if (err) return console.log(err);
        console.log('Wrote movies to oscar-data.js');
      })
}

parseData()