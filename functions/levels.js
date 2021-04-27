const Discord = require('discord.js')

const mongoose = require('mongoose')
const db = process.env.DB

mongoose.connect(db)

const Level = require(process.env.ROOTDIR + '/models/level.js')
const ServerSettings = require(process.env.ROOTDIR + '/models/serverSettings.js')

const get = require('get-value')

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const handleLevel = async (client, message) => {
  if(message.author.bot) return
  let user = message.author
  var i
  for(i = 1; i<=1; i++) { // this shouldn't repeat unless the function created a new database entry
  Level.find({ userID: user.id, guildID: message.guild.id }, (err, arr) => {
    ServerSettings.find({ guildID: message.guild.id}, (err2, settings) => {
    if(arr.length == 0) {
      Level.create({ _id: mongoose.Types.ObjectId(), userID: user.id, guildID: message.guild.id, exp: 0, level: 0 }, err => {
      if(err) return console.log("[functions/levels.js] An error has occurred when creating new DB entry!\n\n" + err)
      })
      i = 0
      return
    }

    if(arr.length > 1) console.log("[functions/levels.js] Check for duplicate entries in the database!") // just in case

    let dbID = get(arr[0], '_id')

    var expVal = get(arr[0], 'exp')
    expVal = expVal + randomInt(2,11) // TODO tweak values
    Level.update({ _id: dbID }, { exp: expVal } , err => {
      if(err) return console.log("[functions/levels.js] An error has occurred when updating DB entry!\n\n" + err)
    })
    var lvl = get(arr[0], 'level')
    var lvlPlusOne = lvl + 1 // duh
    if(expVal >= Math.floor(5 / 6 * lvlPlusOne * (2 * lvlPlusOne * lvlPlusOne + 27 * lvlPlusOne + 91))) { // MEE6 level algorithm
      Level.updateOne({ _id: dbID }, { level: lvlPlusOne } , err => {
        if(err) return console.log("[functions/levels.js] An error has occurred when updating DB entry!\n\n" + err)
      })
      levelEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(message.author.tag)
      .addField("Level Up!", "Congratulations! You're now level " + lvlPlusOne + "!")
      .setThumbnail(user.avatarURL({format: "png", dynamic: true, size: 128}))
      if(!settings[0]) {
        message.channel.send(levelEmbed);
      } else {
        settings[0].levelRedirect.send(levelEmbed)
      }

    }

    })})
  }
}

const getLevel = function (arr) {

    if(!arr) return null
    let cExp = arr[0].exp // current absolute exp
    let cLevel = arr[0].level // current level
    let rExp = cExp - Math.floor((5 / 6 * cLevel * (2 * cLevel * cLevel + 27 * cLevel + 91))) // current exp relative to level
    let clExp = Math.floor((5 / 6 * cLevel * (2 * cLevel * cLevel + 27 * cLevel + 91))) // absolute exp required for current level
    let nlExp = Math.floor((5 / 6 * (cLevel + 1) * (2 * (cLevel + 1) * (cLevel + 1) + 27 * (cLevel + 1) + 91))) // absolute exp required for next level
    let rNlExp = Math.floor((5 / 6 * (cLevel + 1) * (2 * (cLevel + 1) * (cLevel + 1) + 27 * (cLevel + 1) + 91)) - (5 / 6 * cLevel * (2 * cLevel * cLevel + 27 * cLevel + 91))) // exp required for next level, relative to current level

    let returnObj = {
      level: cLevel,
      exp: cExp,
      relExp: rExp,
      currLvl: clExp,
      nextLvl: nlExp,
      relNextLvl: rNlExp
    }
    return obj = returnObj
  return obj
}



module.exports = {handleLevel, getLevel};