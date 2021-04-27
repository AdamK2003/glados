const Discord = require('discord.js')
module.exports.help = {
  name: "rps"
}

	module.exports.run = async (client, message, args) => {
		let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
		.setTitle("RPS GAME")
		.setDescription(`React to play! ${message.member}`) // message.author.tag? lets try that
    .setTimestamp()
		let msg = await message.channel.send(embed)
		await msg.react("🗻")
		await msg.react("✂")
		await msg.react("📰")

		const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 30000, error: ["time"]}).then(
        	async(collected) => {
        		const reaction = collected.first()
        		let result = new Discord.MessageEmbed()
            .setColor("RANDOM")
        		.setTitle("RESULT")
            .addField("Your choice", `${reaction.emoji.name}`)
        		.addField("My choice", `${me}`)
			await msg.edit(result)
        		if ((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "📰" && reaction.emoji.name === "🗻") ||
                (me === "✂" && reaction.emoji.name === "📰")) {
                    message.reply("You lost!");
            } else if (me === reaction.emoji.name) {
                return message.reply("It's a tie!");
            } else {
                return message.reply("You won!");
            }
        })
        .catch(collected => {
                message.reply('Too late, you lose!');
            })
}
