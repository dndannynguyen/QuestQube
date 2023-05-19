const axios = require('axios');
const cheerio = require('cheerio');

const verifyGame = async (game) => {
    const sluggedName = convertFormat(game);
    const twitchResponse = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    const access_token = twitchResponse.data.access_token;
    const igdbResponse = await axios.post(`https://api.igdb.com/v4/games/?fields=name,slug&limit=1&search=${game}&filter[category][eq]=0`, {
        fields: [],
        filters: `slug = "${sluggedName}"`
    }, {
        headers: {
            'Client-ID': `${process.env.TWITCH_CLIENT_ID}`,
            'Authorization': `Bearer ${access_token}`,
            'Accept': 'application/json'
        }
    });
    const gameObject = igdbResponse.data;
    if (gameObject.length === 0) {
        const backupResponse = await axios.get(`https://www.backloggd.com/games/${sluggedName}/`)
        const $ = cheerio.load(backupResponse.data);
        const image = $('.card-img');
        const imageSrc = image.attr('src');
        if (imageSrc.includes('co1pee')) {
            return false
        } else {
            return sluggedName
        }
    } else if (gameObject[0].slug === sluggedName) {
        return gameObject[0]['slug']
    } else if (gameObject[0].slug !== sluggedName) {
        const backupResponse = await axios.get(`https://www.backloggd.com/games/${sluggedName}/`)
        const $ = cheerio.load(backupResponse.data);
        const image = $('.card-img');
        const imageSrc = image.attr('src');
        if (imageSrc.includes('co1pee')) {
            const backupResponse = await axios.get(`https://www.backloggd.com/games/${gameObject[0].slug}/`)
            const $ = cheerio.load(backupResponse.data);
            const image = $('.card-img');
            const imageSrc = image.attr('src');
            if (imageSrc.includes('nocover') || imageSrc.includes('no_image')) {
                return false
            } else {
                return gameObject[0]['slug']
            }
        } else {
            return sluggedName
        }
    }
}

const convertFormat = (game) => {
    let gameName = game.replace(/ - /g, '-'); // Replace " - " with "-"
    gameName = gameName.replace(/[^\w\s-]/gi, '').replace(/\s+/g, '-').toLowerCase(); // Replace other special characters and spaces
    return gameName;
}

module.exports = verifyGame;