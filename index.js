var Discord = require('discord.js');
var client = new Discord.Client();

var request = require('request');
var favicon = require('favicon');

client.login(process.env.DISCORD_KEY);

var prefix = 'j!';
client.on('message', function(msg) {
    if (msg.content.indexOf(prefix)==0) {
        var commandArguments = msg.content.replace(prefix, '').split(' ');
        var commandName = commandArguments.shift();
    }
});
client.on('ready', function() {
    console.log('Ready and waiting, captain!');
});

function faviconEmoji(siteName, cb) {
    var siteUrl = 'https://'+siteName+'.neocities.org/';
    favicon(siteUrl, function(err, data) {
        if (err) return console.log(err);
        if (data) {
            console.log(data);
            if (data.indexOf('data:image')>-1) {
                data = new Buffer(data.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
            } else if (data.indexOf(siteUrl)==-1 && data.indexOf('https')!=0) {
                data = siteUrl + data;
            }
            
            var emojiName = 'favicon_'+siteName;
            var emojiGuild = client.guilds.find('id', '308369594291191819');
            
            emojiGuild.createEmoji(data, emojiName).then(function(emoji) {
                cb({
                    text: '<:'+emojiName+':'+emoji.id+'>',
                    delete: function() {
                        emojiGuild.deleteEmoji(emoji)
                    }
                });
            });
        } else {
            cb(null);
        }
    });
}