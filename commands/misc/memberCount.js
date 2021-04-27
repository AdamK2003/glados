const Discord = require('discord.js')
module.exports.help = {
  name: "membercount",
}

module.exports.run = async (client, message, args) => {
  var mc = message.guild.memberCount
  let replies = [`The server has ${mc} members!`, `Right now we have ${mc} users!`, `Looks like we have ${mc} members and growing!`, `Last time I checked we had ${mc} members`];

  let result = Math.floor((Math.random() * replies.length));

  const countembed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag)
  .setColor("RANDOM")
  .addField("Membercount", replies[result]);

  message.channel.send(countembed);
}