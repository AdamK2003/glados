const Discord = require('discord.js')
module.exports.help = {
  name: "clear",
  aliases: ["purge"]
}
module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("Nope!")

  var msgNum = args[1]

  if (!args[1]) return message.reply("Please enter the ammount of messages")

  console.log(args[1])

  if (msgNum <= 0 | msgNum > 500 | msgNum % 1 != 0 | isNaN(msgNum)) msgNum = 0

  await message.channel.messages.fetch({ limit: ++msgNum }).then(messages => {
    message.channel.bulkDelete(messages, true);
  });

  if (isNaN(args[1])) return message.reply("Please enter a real number")
  if (args[1] > 99) return message.reply("I cannot delete more than 99 messages at a time!")
  if (args[1] == 0) return message.reply("0 messages deleted, why would you want that?!")
  if (args[1] < 0) return message.reply("You can't delete a negative amount of messages!")
  if (args[1] % 1 != 0) return message.reply("The amount of messages must be an integer!")

  message.channel.send('Success! Goodbye messages!')

}