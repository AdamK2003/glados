const axios = require('axios');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
module.exports.help = {
    name: "cat",
}

    module.exports.run = async (client, message, args) => {
        const url = "https://some-random-api.ml/img/cat";
        const facts = "https://some-random-api.ml/facts/cat"

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
            .setTitle(`Random Cat Image and Fact`)
            .setColor("RANDOM")
            .setDescription(fact.fact)
            .setImage(image.link)

        await message.channel.send(embed)
}

/*
client.on('message', message => {

  if (message.content.startsWith(PREFIX + 'cat')) {
      try {
           get('https://aws.random.cat/meow').then(response => {
                 message.channel.send({files: [{attachment: response.body.file, name: `cat.${response.body.file.split('.')[4]}`}]});
                 console.log('random cat picture');
                  })
                  } catch (e) {
                       console.log('error!');
                       }
                     };
});
// any ideas?
// i'm running out of ideas tbh
// same
// whats that unexpected token
// /shrug
//https://gist.github.com/kodle/fe708778efd7d1bbe0920c7e0897b271
*/
// this might be interesting as API's https://docs.duncte123.com/#operation/randomAnimalList
//https://www.youtube.com/watch?v=iyf_jDucW-c