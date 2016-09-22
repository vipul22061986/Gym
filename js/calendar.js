//
// Cordova Reminder Plugin
// Author: Mayur Panchal
// Created: 15-8-2013
//
// Contributors:
// Mayur Panchal


function calendarPlugin()
{
   
}



calendarPlugin.prototype.createEvent = function(title,ArrWeek,repeat,time) {
    console.log("creating event");
    cordova.exec(null,null,"calendarPlugin","createEvent",[title,ArrWeek,repeat,time]);
};
calendarPlugin.prototype.getCalendarList = function(response, err) {
    console.log("getting calendars");
    cordova.exec(response, err, "calendarPlugin", "getCalendarList",[]);
};

calendarPlugin.prototype.clearEvent = function(response, err) {
    console.log("getting clearEvent");
    cordova.exec(response, err, "calendarPlugin", "clearEvent",[]);
};

// More methods will need to be added like fetch events, delete event, edit event

calendarPlugin.install = function()
{
    if(!window.plugins)
    {
        window.plugins = {};
    }
    
    window.plugins.calendarPlugin = new calendarPlugin();
    return window.plugins.calendarPlugin;
};

cordova.addConstructor(calendarPlugin.install);
