const axios = require('axios');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports.help = {
    name: "meme",
}
    module.exports.run = async (client, message, args) => {
        const url = "https://some-random-api.ml/meme";

        let image, response;
        let caption, responses;
        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(url)
            caption = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`meme time!`)
            .setColor(`RANDOM`)
            .setDescription('Here\'s a random meme!')
            .setImage(image.link)

        await message.channel.send(embed)
}