const botToken = ('ODE3ODM5NjM0MzMxNDY3ODA5.YEPWgw.9zEU9eH8Hm2A9EH6O46vMwbn-8k')

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






client = new Discord.Client()
client.login(botToken)

client.on('ready', () => handle('./commands'))
client.on('message', msg => {
  run(',', client, msg)
  handleLevel(client, msg)
})





app.listen(3000)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/web/index.html");
});

app.get("/status", (req, res) => {
    res.sendFile(__dirname + "/web/status.html");
});
