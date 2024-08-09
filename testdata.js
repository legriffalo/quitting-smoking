let testData = {
    "events": [
    {
        "alertOffset":0,
        "color":"red",
        "colorBorder":"",
        "colorText":"",
        "from":"2024-08-08T22:22:00.000Z",
        "id":"10",
        "isAllDay":false,
        "repeatEvery":0,
        "repeatEveryCustomType":0,
        "repeatEveryCustomValue":1,
        "title":"cig",
        "to":"2024-08-08T22:51:00.000Z",
        "type":0,
        "url":""
        },
    {
        "alertOffset":0,
        "color":"red",
        "colorBorder":"",
        "colorText":"",
        "from":"2024-08-08T22:22:00.000Z",
        "id":"5",
        "isAllDay":false,
        "repeatEvery":0,
        "repeatEveryCustomType":0,
        "repeatEveryCustomValue":1,
        "title":"cig",
        "to":"2024-08-08T22:51:00.000Z",
        "type":0,
        "url":""
        },
    {
    "alertOffset":0,
    "color":"orange",
    "colorBorder":"",
    "colorText":"",
    "created":"2024-08-08T13:22:26.174Z",
    "description":"",
    "from":"2024-08-15T13:22:00.000Z",
    "group":"",
    "id":"2",
    "isAllDay":false,
    "lastUpdated":"2024-08-08T13:22:26.174Z",
    "location":"",
    "organizerEmailAddress":"",
    "organizerName":"",
    "repeatEvery":0,
    "repeatEveryCustomType":0,
    "repeatEveryCustomValue":1,
    "repeatEveryExcludeDays":"",
    "showAlerts":true,
    "showAsBusy":true,
    "title":"cig",
    "to":"2024-08-15T13:52:00.000Z",
    "type":0,
    "url":""
    },
    {
    "alertOffset":0,
    "color":"",
    "colorBorder":"",
    "colorText":"",
    "created":"2024-08-08T13:22:10.865Z",
    "description":"",
    "from":"2024-08-22T13:22:00.000Z",
    "group":"",
    "id":"3",
    "isAllDay":false,
    "lastUpdated":"2024-08-08T13:22:10.865Z",
    "location":"",
    "organizerEmailAddress":"",
    "organizerName":"",
    "repeatEvery":0,
    "repeatEveryCustomType":0,
    "repeatEveryCustomValue":1,
    "repeatEveryExcludeDays":"",
    "showAlerts":true,
    "showAsBusy":true,
    "title":"cig",
    "to":"2024-08-22T13:52:00.000Z",
    "type":0,
    "url":""
    }
    ]
    }

// const data1 = new File([JSON.stringify(testData)],'mydata.JSON',{ type: 'application/json',
//     webkitRelativePath:""
//  });


console.log('testData in ')


// // Create element with <a> tag
// const link = document.createElement("a");

// // // Create a blog object with the file content which you want to add to the file
// // const file = new Blob([content], { type: 'text/plain' });

// // Add file content in the object URL
// link.href = URL.createObjectURL(data1);

// // Add file name
// link.download = "data.json";

// // Add click event to <a> tag to save file.
// link.click();
// URL.revokeObjectURL(link.href);


// var input = document.getElementById("myFile");
// var output = document.getElementById("output");


// input.addEventListener("change", function () {
//   if (this.files && this.files[0]) {
//     var myFile = this.files[0];
//     var reader = new FileReader();
    
//     reader.addEventListener('load', function (e) {
//       output.textContent = e.target.result;
//     });
    
//     reader.readAsBinaryString(myFile);
//   }   
// });