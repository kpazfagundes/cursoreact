const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, bio, avatar_url } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                techs: techsArray,
                name,
                bio,
                avatar_url,
                location,
            });
        }
        return response.json(dev);
    },

    async update(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.updateOne(
                { github_username },
                { $set:{
                    techs: techsArray,
                    name,
                    bio,
                    location,
                },    
            });
        }
        return response.json(dev);
    },
    async delete(request, response) {},
};