var calendarInstance1 = new calendarJs( "calendar", {
  manualEditingEnabled: false,
  maximumEventsPerDayDisplay:"15",
  minutesBetweenSections:"60",
  exportEventsEnabled: true,
    importEventsEnabled:true,
    // initialDateTime:,
    manualEditingEnabled: true,
    showDayNumberOrdinals: false,
    viewToOpenOnFirstLoad:'full-month',
    fullScreenModeEnabled: false,
    showTimelineArrowsOnViews: false,
    maximumEventTitleLength: 10,
    maximumEventDescriptionLength: 10,
    maximumEventLocationLength: 10,
    maximumEventGroupLength: 10,
    tooltipsEnabled: true,
    visibleDays: [ 0, 1, 2, 3, 4 ,5 , 6],
    // hideEventsWithoutGroupAssigned: true,
    showHolidays: false,
    allowHtmlInDisplay: true,
    workingDays: []

// All your options can be set here
} );


function updateCalendar(){
  console.log('attempting import')
  var input = document.createElement( "input" ); 
  const fileInput = input;
  // Get your file ready
  const myFileContent = [JSON.stringify(userData["activity_log"])];
  const myFileName = 'mydata.json';
  const myFile = new File(myFileContent, myFileName);
  // Create a data transfer object. Similar to what you get from a `drop` event as `event.dataTransfer`
  const dataTransfer = new DataTransfer();
  // Add your file to the file list of the object
  dataTransfer.items.add(myFile);
  // Save the file list to a new variable
  const fileList = dataTransfer.files;
  // Set your input `files` to the file list
  fileInput.files = fileList;
  calendarInstance1.import(fileList);
  
  return 1;
};


function calendarTimeFormat(x){
  // console.log(date)
  let date = new Date(x);
  var dateString = `${date.getFullYear()}-${("0"+(date.getMonth()+1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:00.000Z`
  return dateString
};


function newCalendarData(event,color, duration,start='',end=''){
    let log = userData["activity_log"];
    let events = log["events"];
    events.push(buildEvent(event,color,duration,start,end));
}

function buildEvent(event,color,duration,start='',end=''){
  // console.log(end)
  let now = start? new Date(start):new Date();
  // console.log('now is here', now);
  // console.log('end is here', end);

  // keeps time accurate to timezone
  var date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);  
  
  // let now = calendarTimeFormat(date)
  // let endTime = end? new Date(end):;
  let min5 = end? end: new Date(date.getTime() + duration*60000);
  // console.log(min5)


  min5 = calendarTimeFormat(min5)
  // console.log('now is now', now)
  // console.log('min5 is ',min5)
  
  let newData = {"alertOffset":0,
      "color":color,
      "colorBorder":"white",
      "colorText":"",
      "from":now,
      "id":event + now,
      "isAllDay":false,
      "repeatEvery":0,
      "repeatEveryCustomType":0,
      "repeatEveryCustomValue":1,
      "title":event,
      "to":min5,
      "type":0,
      "url":""
      }

  console.log(newData)

return newData;
        
};


function showDarkZone(){
  if(!!userData["activity_log"]){
  
  let log = userData['activity_log'];


  let events = log['events'];
  let firstDataDate = events[0]["from"];
  let yearOfFirst = new Date(firstDataDate);
  let now = new Date()
  yearOfFirst = new Date(yearOfFirst.getTime() + now.getTimezoneOffset() * 60000);
  let yearStart = new Date(`${yearOfFirst.getFullYear()}-01-01T00:00:00.000z`);
  newCalendarData("no Data","grey",duration = null, start = yearStart , end = yearOfFirst)
  }
  else{
    console.log('no user data to use')
  }
}

function quitShow(){
  try{
    let log = userData['activity_log'];
    console.log(log["events"])
    // let events = log['events'];

    let dupevents = log['events'].slice();
    console.log("duplicated", dupevents);
    let i = 0;

    while(dupevents.length>0){
      i+=1;
      let check = dupevents.pop()
      // console.log(check)
      if (check["title"]=="smoked"){
        console.log("breaking as smoke event is most recent ")
        break };

      if(check["title"]=="quit"){
        //do the end date thing
        console.log("found a quit event", i)
        let original = log["events"]
        console.log(original)
        console.log(original[original.length -i])
        let update = original[original.length -i]
        let now = new Date()
        update["to"] = calendarTimeFormat(now.getTime() + now.getTimezoneOffset() * 60000 + 300000);
        save()
        break
      }
    }

  }

  catch{console.log('no user data available')}
}

//important// add code to select all events and add a new class to minify them in day to day view
function dressCalendarElements(){
  console.log("dressing events");
  try{
  let els = document.getElementsByClassName('event');
  // console.log("dressing events",els[0])

  for(let i = 0; i<els.length;i++){
    console.log("fixing calendar css")
    if(els[i].id.includes('smoked')){
      els[i].classList.add('minify');
    }
    if(els[i].id.includes('craving')){
      els[i].classList.add('minify')
    }
  }
}
catch{
  console.log("no elements to fix");
}
}


showDarkZone();
quitShow();
// dressCalendarElements();

document.getElementById('calendar').classList.add('hidden_calendar')



