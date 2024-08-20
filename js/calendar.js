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
  // console.log(fileInput.length)
  // console.log(fileList)
  calendarInstance1.import(fileList);
  // console.log(fileList)
  console.log('changed')
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
  console.log(end)
  let now = start? new Date(start):new Date();
  console.log('now is here', now);
  console.log('end is here', end);

  // keeps time accurate to timezone
  var date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);  
  
  // let now = calendarTimeFormat(date)
  // let endTime = end? new Date(end):;
  let min5 = end? end: new Date(date.getTime() + duration*60000);
  console.log(min5)


  min5 = calendarTimeFormat(min5)
  console.log('now is now', now)
  console.log('min5 is ',min5)
  
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
  let log = userData['activity_log'];
  let events = log['events'];
  let firstDataDate = events[0]["from"];
  let yearOfFirst = new Date(firstDataDate);
  console.log(yearOfFirst.getFullYear())
  // let yearStart = new Date('2024-08-20T08:44:12.871Z');

  let yearStart = new Date(`${yearOfFirst.getFullYear()}-01-01T00:00:00.000z`);

  console.log('date you want is here',yearStart)
  // console.log(events[0]["from"])
  // console.log(first)
  // console.log('look above for first log')

  newCalendarData("no Data","grey",duration = null, start = yearStart , end = firstDataDate)
}

// console.log(new Date())

// var date = new Date()
// var newDateObj = new Date(date.getTime() + 5*60000);

// console.log(calendarTimeFormat(newDateObj))

// console.log(newCalendarData("1"))

showDarkZone();

document.getElementById('calendar').classList.add('hidden_calendar')