var Discord = require('discord.js');
var client = new Discord.Client();

client.login(process.env.DISCORD_KEY);

client.on('ready', function() {
	client.channels.find('id', '348409825736261643').sendMessage("test");
});