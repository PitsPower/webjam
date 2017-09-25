var Discord = require('discord.js');
var client = new Discord.Client();

client.login(process.env.DISCORD_KEY);

client.on('ready', function() {
    
});