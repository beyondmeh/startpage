function updateTime() {
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    
    var time    = new Date();
    var hours   = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var day     = time.getDate();
    var month   = time.getMonth();
    var year    = time.getFullYear();
    
    // Pad the minutes and seconds with leading zeros, if required
    minutes = ( minutes < 10 ? "0" : "" ) + minutes;
    seconds = ( seconds < 10 ? "0" : "" ) + seconds;

    // am or pm
    var meridian = ( hours < 12 ) ? "am" : "pm";

    // 24 hour to 12 hour
    hours = ( hours > 12 ) ? hours - 12 : hours;
    hours = ( hours == 0 ) ? 12 : hours;

    month = months[month];

    var clock = hours + ":" + minutes + ":" + seconds + " " + meridian;
    var date  = month + " " + day + ", " + year;

    $("#time").html(clock);
    $("#date").html(date);
    
    if (minutes == "00" && seconds == "00") {
        var chime = new Audio("assets/sounds/gong.ogg");
        chime.play();
    }
}

function rain() {
    var fadeTime = 5000;
    var rainFile = "rain" + Math.floor((Math.random() * 3) + 1) + ".ogg";     
    
    var sound = new Audio("assets/sounds/rain/" + rainFile);
    
    // Wait for the sound to be fully loaded...
    sound.addEventListener('loadedmetadata', function(event) {
        var duration = sound.duration;
        duration *= 1000; // convert to milliseconds
        
        // We have to have enough time to fade in and fade out...
        var fadeAfter = duration - (fadeTime * 2);
    
        console.log('rain: playing ' + rainFile + ' (len: ' + duration + 'ms)...');
        sound.volume = 0;
        sound.play();
        
        // Fade in sound
        $(sound).animate({volume: 1}, fadeTime, function() {
     
            // Wait until fadeAfter...
            setTimeout(function(){
                // Fade out sound while starting a new one...
                $(sound).animate({volume: 0}, fadeTime);
                rain();
                
            }, fadeAfter);
        });
    });
}

function thunderTimer() {
    minTime = 5000;  // 5 seconds
    maxTime = 20000; // 20 seconds
    return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
}

function thunder() {
    var thunderSounds = [ 'thunder1.ogg', 'thunder2.ogg', 'thunder3.ogg', 
                          'thunder4.ogg', 'thunder5.ogg', 'thunder6.ogg', 
                          'thunder7.ogg', 'thunder8.ogg', 'thunder9.ogg' ];

    var thunderFile = thunderSounds[Math.floor(Math.random() * thunderSounds.length)];

    console.log('thunder: playing ' + thunderFile);   
    sound = new Audio("assets/sounds/rain/" + thunderFile);
    sound.play();

    sound.addEventListener('ended', function() {
        var timer = thunderTimer();    
        setTimeout(thunder, timer);
        
        var msg = '         '
        msg += 'done! Waiting ' + (timer / 1000) + ' secs...'
        console.log(msg);
    });
}

$(function() {
    setInterval('updateTime()', 1000);

    rain();
    setTimeout('thunder()', thunderTimer());
});
