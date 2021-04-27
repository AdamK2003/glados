const mongoose = require('mongoose')
 
const db = process.env.DB


mongoose.connect(db)

const Warn = require(process.env.ROOTDIR + '/models/warn.js')


const Discord = require('discord.js')
module.exports.help = {
    name: "warn", 
}

module.exports.run = async (client, message, args) => {
  await message.delete()
  if(!message.member.hasPermission(['MANAGE_MESSAGES'], true, true )) {
    return message.channel.send("Nope!");
  }
  let rUser = message.mentions.members.first();
  if(!rUser) return message.reply("Invalid user!")
  let rReason = args.slice(2).join(" ")
  if(!rReason) return message.reply("Please supply a reason.")

  const report = new Warn({
    _id: mongoose.Types.ObjectId(),
    username: rUser.user.tag,
    userID: rUser.id,
    reason: rReason,
    reportedBy: message.author.tag,
    reportedByID: message.author.id,
    guildID: message.guild.id,
    time: message.createdAt.toUTCString()
  })

report.save()
.then(result => console.log(result))
.catch(err => console.log(err));

message.reply('Warned ' + rUser.user.tag + '! Reason: '+rReason)

}
