var Discord = require('discord.js');
var client = new Discord.Client();

client.login(process.env.DISCORD_KEY);

client.on('ready', function() {
	client.channels.find('id', '361305953620197386').sendMessage("This is yet another test. Can you believe it?");
});