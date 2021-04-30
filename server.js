

const express = require('express')
const http = require('http')
const path = require('path')
const app = express();

const fs = require('fs')
var md5 = require('md5');

const mongoose = require('mongoose')

const Discord = require("discord.js")
const { handle, run } = require('penguin-handler')

const { handleLevel } = require(__dirname + '/functions/levels.js') 


botToken = process.env.TOKEN
prefix = process.env.PREFIX




client = new Discord.Client()
client.login(botToken)

client.on('ready', () => handle('./commands'))
client.on('message', msg => {
  handleUpdate(prefix, msg)
  run(prefix, client, msg)
  handleLevel(client, msg)
})




// <webserver>
app.listen(3000)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/web/index.html");
});

app.get("/status", (req, res) => {
    res.sendFile(__dirname + "/web/status.html");
});
// </webserver>

const handleUpdate = function (prefix, message) {
  if((message.content == `${prefix}update`)&&(message.author.id == '206125763328606208')) {
    message.channel.send("Restarting and updating bot...")
    process.exit(0)
  }
}

// test