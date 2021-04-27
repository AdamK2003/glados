const axios = require('axios');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports.help = {
    name: "dog",
}

    module.exports.run = async (client, message, args) => {
        const url = "https://some-random-api.ml/img/dog";
        const facts = "https://some-random-api.ml/facts/dog"

        let image, response;
        let fact, responses;
        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Dog Image and Fact`)
            .setColor("RANDOM")
            .setDescription(fact.fact)
            .setImage(image.link)

        await message.channel.send(embed)
    }