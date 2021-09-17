const Discord = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv")
const chalk = require("chalk")
const { loadAntiraid } = require("./utils/functions")

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.commands = new Discord.Collection();
require('dotenv').config()
require("./utils/loadEvents")(client);


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

const commandsFiles = fs.readdirSync('./owner/').filter(file => file.endsWith('.js'));
client.snipes = new Discord.Collection()

for (const file of commandsFiles) {
    const command = require(`./owner/${file}`)

    client.commands.set(command.name, command);
}

const prefix = "a!";
loadAntiraid(client);
client.login(process.env.token);