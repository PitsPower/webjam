var Discord = require('discord.js');
var client = new Discord.Client();

client.login(process.env.DISCORD_KEY);

var prefix = 'j!';
client.on('message', function(msg) {
    if (msg.content.indexOf(prefix)==0) {
        console.log(msg.content);
    }
});
client.on('ready', function() {
    console.log('Ready and waiting, captain!');
});