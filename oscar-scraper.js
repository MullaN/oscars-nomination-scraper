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
    console.log(pageBody)
}

parseData()