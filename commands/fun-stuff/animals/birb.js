const axios = require('axios');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports.help = {
    name: "birb",
    aliases: ["bird"]
}

    module.exports.run = async (client, message, args) => {
        const url = "https://some-random-api.ml/img/birb";

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Bird Image`)
            .setColor("RANDOM")
            .setDescription('Here\'s a bird pic for ya!' )
            .setImage(image.link)

        await message.channel.send(embed)
    }