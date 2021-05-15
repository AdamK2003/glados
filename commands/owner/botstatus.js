const Discord = require('discord.js')

const updateJsonFile = require('update-json-file')
const presence = require(`${process.env.ROOTDIR}/presence.json`)
const jsonPath = process.env.ROOTDIR + '/presence.json'

let allowedStatus = ['online','idle','invisible','dnd']
let allowedActivity = ['PLAYING','WATCHING','LISTENING','STREAMING','COMPETING']
let status, activity, activityName
module.exports.help = {
  name: "botstatus",
  aliases: []
}

module.exports.run = async (client, message, args) => {
    if(message.author.id != '206125763328606208') return
    if(args[1]) {
        status = allowedStatus.includes(args[1].toLowerCase()) ? args[1].toLowerCase() : 'online'
    } else {
        return
    }
    if(args[2]) {
        activity = allowedActivity.includes(args[2].toUpperCase()) ? args[2].toUpperCase() : 'PLAYING'
    } else {
        activity = presence.activityType
    }
    if(args[3]) {
        activityName = args.slice(3).join(' ')
    } else {
        activityName = ''
    }
if(args[2]) {
    client.user.setPresence({
    status: status,
    activity: {
        name: activityName,
        type: activity
    }
    })
} else {
    client.user.setPresence({
        status: status
    })
}


if(!args[2]) {
updateJsonFile(jsonPath, (data) => {
  data.status = status
  return data
})
} else {
updateJsonFile(jsonPath, (data) => {
  data.status = status
  data.activityType = activity
  data.activityName = activityName
  return data
})
}

}
