const { JSDOM } = require("jsdom")
const axios = require('axios')

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
    awardDivs = Array.from(awardDivs).filter(div => awards.some(award => div.children[0].children[0] && div.children[0].children[0].innerHTML === award))
    
}

parseData()