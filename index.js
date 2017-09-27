var Discord = require('discord.js');
var client = new Discord.Client();

var request = require('request');
var favicon = require('favicon');

client.login(process.env.DISCORD_KEY);

var prefix = 'j!';
var adminPrefix = 'j@';
var embedColor = 6156158;

var commands = [
    {
        name: 'help',
        desc: 'Displays all commands',
        usage: 'help',
        admin: false,
        action: function(msg, args, end) {
            msg.channel.send({embed: {
        	    color: embedColor,
        	    fields: getHelp(false)
        	}});
            end();
        }
    },
    {
        name: 'help',
        desc: 'Displays all judge commands',
        usage: 'help',
        admin: true,
        action: function(msg, args, end) {
            msg.channel.send({embed: {
        	    color: embedColor,
        	    fields: getHelp(true)
        	}});
            end();
        }
    },
    
    {
        name: 'list',
        desc: 'Lists all competitors',
        usage: 'list',
        admin: true,
        action: function(msg, args, end) {
            var competitors = ['project2', 'palutena', 'rocketmix'];
            var embedArray = [];
            
            var emojis = [];
            for (var i=0;i<competitors.length;i++) {
                faviconEmoji(competitors[i], function(emoji, i) {
                    embedArray.push({
                        name: (emoji?emoji.text+'\t':'')+competitors[i],
                        value: '[Site](https://'+competitors[i]+'.neocities.org)'
                    });
                    emojis.push(emoji);
                    
                    if (emojis.length==competitors.length) {
                        msg.channel.send({embed: {
                            color: embedColor,
                            fields: embedArray
                        }}).then(function() {
                            for (var j=0;j<emojis.length;j++) {
                                if (emojis[j]) emojis[j].delete();
                            }
                        });
                        end();
                    }
                }, i);
            }
        }
    }
];

function getHelp(admin) {
    var helpArray = [];
    for (var i=0;i<commands.length;i++) {
        if (commands[i].admin==admin) helpArray.push({
            name: (admin?adminPrefix:prefix)+commands[i].name,
            value: commands[i].desc+'\n`'+(admin?adminPrefix:prefix)+commands[i].usage+'`'
        });
    }
    return helpArray;
}

function faviconEmoji(siteName, cb, i) {
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
                }, i);
            });
        } else {
            cb(null, i);
        }
    });
}

client.on('message', function(msg) {
    if (msg.content.indexOf(prefix)==0 || msg.content.indexOf(adminPrefix)==0) {
        msg.channel.startTyping();
        
        var admin = msg.content.indexOf(adminPrefix)==0;
        var commandArguments = msg.content.replace(prefix, '').replace(adminPrefix, '').split(' ');
        var commandName = commandArguments.shift();
        
        for (var i=0;i<commands.length;i++) {
            if (commands[i].name==commandName && commands[i].admin==admin) {
                if (!commands[i].admin || msg.member.roles.find('id', '362339662527987713')) {
                    commands[i].action(msg, commandArguments, function() {
                        msg.channel.stopTyping(true);
                    });
                } else {
                    msg.channel.send('You are not a judge! Get outta here!');
                }
            }
        }
    }
});
client.on('ready', function() {
    console.log('Ready and waiting, captain!');
});