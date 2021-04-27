const Discord = require('discord.js')
module.exports.help = {
  name: "8ball"
}

module.exports.run = async (client, message, args) => {

  if(!args[2]) return message.reply("Please ask a full question");
  let replies = ["Yes.", "No.", "Ask the all knowing AdamSkI2003.", "I don't know...", "Do you really care?", "I've heard various opinions: What's yours?", "Physically? Mentally? Spiritually? Socioeconomically? Financially? I'm not sure how to answer that!?!", "I dunno. Is it Friday yet?", "Do you want the short or long version?", "Holy sh*t, you can see me?!", "How much will you pay me if I tell you?"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(1).join(" ");

  let ballembed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag)
  .setColor("RANDOM")
  .addField("Question", question)
  .addField("Answer", replies[result]);

message.channel.send(ballembed);
}