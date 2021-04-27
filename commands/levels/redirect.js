const Discord = require('discord.js')

const mongoose = require('mongoose')

const db = process.env.DB
mongoose.connect(db)

const ServerSettings = require(process.env.ROOTDIR + '/models/serverSettings.js')

const get = require('get-value')
module.exports.help = {
  name: "redirect",
  aliases: []
}

module.exports.run = async (client, message, args) => {
  channel = message.mentions.channels.first()
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nope!")
  if(args[1] == "clear") ServerSettings.deleteOne({ guildID: message.guild.id }, (err, res) => {
    if(get(res, "ok") != 1) return message.channel.send("An error has occurred!")
    return message.reply("Redirect cleared!")
  })

  if(!channel) return message.reply("Please provide a channel!")
  
  ServerSettings.find({ guildID: message.guild.id }, (err, arr) => {

    if(!arr) {
      ServerSettings.create({ _id: mongoose.Types.ObjectId(), guildID: message.guild.id, levelRedirect: channel, levelRedirectID: channel.id}, err => {
      if(err) return console.log("[functions/levels.js] An error has occurred when creating new DB entry!\n\n" + err)
      })
      return message.channel.send("Redirecting level up messages to " + channel.toString() + "!")
    }
    ServerSettings.update({ guildID: message.guild.id }, { levelRedirect: channel, levelRedirectID: channel.id } , err => {
      if(err) return console.log("[functions/levels.js] An error has occurred when updating DB entry!\n\n" + err)
      return message.channel.send("Redirecting level up messages to " + channel.toString() + "!")
    })
  })
}