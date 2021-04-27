const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
module.exports.help = {
  name: "raw",
  //    aliases: [] 
}
module.exports.run = async (client, message, args) => {
 message.channel.send('\`\`\`\n'+message.content+'\n\`\`\`')
}