function updateTime() {
    var time    = new Date ( );
    var hours   = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    // Pad the minutes and seconds with leading zeros, if required
    minutes = ( minutes < 10 ? "0" : "" ) + minutes;
    seconds = ( seconds < 10 ? "0" : "" ) + seconds;

    // Choose either "AM" or "PM" as appropriate
    var meridian = ( hours < 12 ) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    hours = ( hours > 12 ) ? hours - 12 : hours;

    // Convert an hours component of "0" to "12"
    hours = ( hours == 0 ) ? 12 : hours;

    // Compose the string for display
    var clock = hours + ":" + minutes + ":" + seconds + " " + meridian;
    
    
    $("#time").html(clock);
        
 }

$(function() {
    setInterval('updateTime()', 1000);
    
    
}
