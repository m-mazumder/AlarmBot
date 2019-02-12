const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const ytdl = require("ytdl-core");
const request = require("request");

var dispatcher = null;

exports.playSong = function (id, message, voice) {
    //only play on voice channel
    voiceChannel = voice;
    voiceChannel.join().then(function (connection) {
        stream = ytdl('https://www.youtube.com/watch?v=' + id, {
            filter: 'audioonly'
        });

        dispatcher = connection.playStream(stream);
    });
}

exports.getVideoId = function (string, cb) {
    if (isYoutube(string)) {
        cb(getYtId(string));
    }
    else {
        queryVideo(string, function (id) {
            cb(id);
        });
    }
}

function queryVideo(query, callback) {
    request('https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=' + encodeURIComponent(query) + '&key=' + config.yt_api_key, function (error, response, body) {
        var json = JSON.parse(body);
        //get first search result
        callback(json.items[0].id.videoId);
    });
}

function isYoutube(string) {
    return string.toLowerCase().indexOf('youtube.com') > -1;
}

client.login(config.discord_token);
