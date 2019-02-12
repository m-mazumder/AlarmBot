const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const time = require("./time.js");
const playM = require("./play.js");
const getVideoInfo = require("youtube-info");

client.on("message", (message) => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  exports.play = function (songName, alarmName, voice) {
    playM.getVideoId(songName, function (id) {
      playM.playSong(id, message, voice);
      getVideoInfo(id, function (err, videoinfo) {
        if (err) throw new Error(err);
        message.channel.send('\nREMINDER: ' + alarmName + '\n' + 'PLAYING: ' + videoinfo.title);
      });
    });
  }

  if (!message.content.startsWith(config.prefix)) return;

  switch (command) {
    case "prefix":
      let newPrefix = message.content.split(" ").slice(1, 2)[0];
      config.prefix = newPrefix;
      fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      break;
    case "help":
      message.channel.send('prefix - customize the prefix theuser would like to use' + '\n' +
        'set ');
      break;
    case "set":
      let month = args[0];
      let date = args[1];
      let year = args[2];
      let hours = args[3];
      let minutes = args[4];
      let reminder = args[5];
      let songname = '';
      let voiceChannel = message.member.voiceChannel;

      for (var i = 6; i < args.length; i++) {
        songname += args[i] + ' ';
      }
      var newAlarm = new Date(year, month - 1, date, hours, minutes);
      time.addAlarm(newAlarm, reminder, songname, voiceChannel);
      message.channel.send('ALARM SET \n' + '----------------------------------\n' + 'DATE: ' + month + '/' + date + '/' + year + '\n' + 'TIME: ' + hours + ':' + minutes + '\n' + 'NAME: ' + reminder + '\n' + 'SONG: ' + songname);
      break;
    case "list":
      message.channel.send(time.printAlarms());
      break;
  }
});

time.clock();
client.login(config.discord_token);