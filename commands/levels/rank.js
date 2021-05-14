const Discord = require('discord.js')
const { getLevel } = require(process.env.ROOTDIR + '/functions/levels.js') 

const Level = require(process.env.ROOTDIR + '/models/level.js')
const mongoose = require('mongoose')
const db = process.env.DB

module.exports.help = {
  name: "rank",
  aliases: ["level"]
}




module.exports.run = async (client, message, args) => {
  if(!message.mentions.members.first()) {
  await Level.find({ userID: message.author.id, guildID: message.channel.guild.id }, (err, arr) => { 
   return obj = getLevel(arr)
  })
  user = message.author
  } else {
  await Level.find({ userID: message.mentions.members.first().id, guildID: message.channel.guild.id }, (err, arr) => { 
   return obj = getLevel(arr)
  })
  user = message.mentions.members.first().user
  }
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(user.tag)
  .addField("Level " + obj.level, obj.relExp + "/" + obj.relNextLvl + " XP")
  .setThumbnail(user.avatarURL({format: "png", dynamic: true, size: 128}))
  message.channel.send(embed)
}
