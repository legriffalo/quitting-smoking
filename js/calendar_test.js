
// var eventData = {
    
// }


var calendarInstance1 = new calendarJs( "calendar", {
    manualEditingEnabled: true,
    // useLocalStorageForEvents: true,
    exportEventsEnabled: true,
    importEventsEnabled:true


    // All your options can be set here
  } );

  const data1 = new File([JSON.stringify(testData)],'mydata.JSON',{ type: 'application/json',
    webkitRelativePath:""
 });

function attemptImport(){
    console.log('attempting import')
    var input = document.createElement( "input" ); 
    const fileInput = input;
    // Get your file ready
    const myFileContent = [JSON.stringify(testData)];
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
    console.log(fileInput.length)
    console.log(fileList)
    calendarInstance1.import(fileList);
    console.log(fileList)
    console.log('changed')
};

function attemptExport(){
    var ex1 = calendarInstance1.export('json');
    console.log(ex1)

};


// function importEvents() {
//     var input = document.createElement( "input" );
//     input.type = "file";
//     input.accept = ".ical, .ics, .json";
//     input.multiple = "multiple";

//     input.onchange = function() {
//         console.log(input.files)
//         calendarInstance1.import( input.files );
//     };

//     input.click();
// }