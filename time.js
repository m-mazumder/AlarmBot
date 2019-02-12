var playMusic = require("./app.js");

var alarms = [];
var names = [];
var songs = [];
var voice = [];

exports.addAlarm = function(newAlarm, name, song, voiceChannel){
    alarms.push(newAlarm);
    names.push(name);
    songs.push(song);
    voice.push(voiceChannel);
}

function checkTime(){
    var dater = new Date();
    for(var i = 0; i < alarms.length; i++){
        var universal = Date.UTC(alarms[i].getFullYear(), alarms[i].getMonth(), alarms[i].getDate(), alarms[i].getHours(), alarms[i].getMinutes(), 0);
        var d = Date.UTC(dater.getFullYear(), dater.getMonth(), dater.getDate(), dater.getHours(), dater.getMinutes(), dater.getSeconds());
        if(universal == d){
            playMusic.play(songs[i], names[i], voice[i]);
        }
    }
}

exports.clock = function(){
    setInterval(function(){checkTime()}, 1000);
}

exports.printAlarms = function(){
    var alarmList = 'ALARMS \n';
    alarmList += '----------------------------------\n';
    for(var i = 0; i < alarms.length; i++){
        alarmList += 'DATE:  ' + ( alarms[i].getMonth() + 1) + '/' + alarms[i].getDate() + '/' + alarms[i].getFullYear() + '\n' + 'TIME: ' + alarms[i].getHours() + ':' + ((alarms[i].getMinutes()<10?'0':'') + alarms[i].getMinutes()) + '\n' + 'NAME: ' + names[i] + '\n' + 'SONG: ' + songs[i] + '\n\n';
    }
    return alarmList;
} 