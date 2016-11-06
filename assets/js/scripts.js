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
}

$(function() {
    setInterval('updateTime()', 1000);
});
