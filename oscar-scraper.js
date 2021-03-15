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
    const awards = document.querySelectorAll('div.view-grouping-header > h2')
    console.log(Array.from(awards).map(award => award.innerHTML))
}

parseData()