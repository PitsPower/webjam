var Discord = require('discord.js');
var client = new Discord.Client();

client.login('MzYxNDk5ODY0NjM2MzI1ODg5.DKl1rg.5Yt0_FVA21wFnFO36D8f4yeVrgI');

client.on('ready', function() {
	client.channels.find('id', '361305953620197386').sendMessage("Hello! This is a test.");
});