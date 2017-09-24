var Discord = require('discord.js');
var client = new Discord.Client();

client.login(process.env.DISCORD_KEY);

client.on('ready', function() {
	client.channels.find('id', '361305953620197386').sendMessage("Hello! This is a test.");
});