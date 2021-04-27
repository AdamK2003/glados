const Discord = require('discord.js')

module.exports.help = {
  name: "say",
  description: "sends a message to a channel",
  category: "moderation",
  aliases: ["anc", "announce"]
}

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission(["MANAGE_MESSAGES"]| ["ADMINISTRATOR"])) return message.channel.send("No!")

  let argsresult;
  let textChannel = message.mentions.channels.first()
  console.log(textChannel)
  message.delete().catch();

  message.delete
  if (textChannel) {
    argsresult = args.slice(2).join(" ")
    textChannel.send(argsresult)
  } else {
    argsresult = args.slice(1).join(" ")
    message.channel.send(argsresult)
  }

}