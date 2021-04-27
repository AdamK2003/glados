const mongoose = require('mongoose')

const db = process.env.DB

mongoose.connect(db)

const get = require('get-value')

const Warn = require(process.env.ROOTDIR + '/models/warn.js')

const Discord = require('discord.js')

module.exports.help = {
    name: "clearwarns", 
}

module.exports.run = async (client, message, args) => {
  await message.delete()
  if(!message.member.hasPermission(['MANAGE_MESSAGES'], true, true)) return message.channel.send("Nope!")
  let rUser = message.mentions.members.first();
  if(!rUser) return message.channel.send("Invalid user!")
  Warn.deleteMany({ userID: rUser.id, guildID: message.guild.id }, (err, res) => {
    if(get(res, "ok") != 1) return message.channel.send("An error has occurred!")
    if(get(res, "n") == 0) return message.channel.send(rUser.user.tag+": No warns to delete!")
    return message.channel.send(rUser.user.tag+": "+get(res, "n")+" warns deleted!")
})
}