let quitStartTime = userData["quit_started"]? userData["quit started"]: '';
// console.log(userData["quit_started"])
let lastCig = userData["last_smoked"]? userData["last_smoked"]:'-';
// console.log('last cig is ',lastCig)
let lastCraving = userData["last_craving"]? userData["last_craving"]:'-';


// loading in display elements
let quitTime = document.getElementById('quit_time');
let lastSmoked = document.getElementById('last_smoked');
let lastCraved = document.getElementById('last_craved');
let timeClean = document.getElementById('time_clean');
let timeCravingFree = document.getElementById('time_craving_free');
let quitText = document.getElementById('quit_text');

// loading buttons
let quitButton = document.getElementById('quit_button');
let craveButton = document.getElementById('crave_button');
let smokedButton = document.getElementById('smoked_button');
let calendarButton = document.getElementById('show_calendar');

quitStartTime!=''? quittingToggle(): null;

// functions
const save = ()=>{
    localStorage.setItem('userData',JSON.stringify(userData));
    // location.reload();
}

function dateFormater(date){
    date = new Date (date);
    var dateString = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
    date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    return dateString
};

function timeElapsed(t1,t2){
    // console.log('last cig is', t1,'now is ', t2);
    // console.log(Date.parse(t1));
    // console.log(Date.parse(t2));
    const diffTime = Math.abs(Date.parse(t2) - Date.parse(t1));
    // console.log('check me !!!')
    // console.log('now',Date.now())
    // console.log('diff time is ', diffTime)



    const diffDaysHoursMins = `${Math.floor(diffTime / (1000 * 60 * 60 * 24))} days ${Math.floor(diffTime / (1000 * 60*60)%24)} hours ${Math.floor(diffTime / (1000 * 60)%60)} mins`;
    // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    // console.log(diffTime + " milliseconds");
    // console.log(diffDaysHoursMins + "all");
    return [diffDaysHoursMins,diffTime] 
}

function timeUpdate(){
    let now = new Date()
    console.log('interval running')
    timeClean.innerHTML = timeElapsed(lastCig,now)[1]? timeElapsed(lastCig,now)[0]:'-';
    timeCravingFree.innerHTML = timeElapsed(lastCraving,now)[1]? timeElapsed(lastCraving,now)[0]:'-';
    
};

function showStaticData(){
    console.log('updating display')
    quitStartTime = userData["quit_started"]? userData["quit started"]: '';
    lastCig = userData["last_smoked"]? userData["last_smoked"]:'-';

    showQuitStartTime = userData["quit_started"]? dateFormater(userData["quit_started"]):'You should quit!';
    quitTime.innerHTML = showQuitStartTime;
    // console.log('showed quitting')


    // add script for cravings here
    let showLastCrave = userData["last_craving"]? dateFormater(userData["last_craving"]):'-';
    // console.log(showLastCrave)
    lastCraved.innerHTML = showLastCrave;

    let showLastCig = userData["last_smoked"]? dateFormater(userData["last_smoked"]):'-';
    lastSmoked.innerHTML = showLastCig;
// console.log('wtf')

};


function quittingToggle(){
    // console.log(Date.parse(userData["quit_started"]),Date.parse(userData["last_smoked"]))
    if(quitButton.classList.contains("hidden")){
        quitButton.classList.remove('hidden');
        quitText.classList.add('hidden');
        var r = document.querySelector(':root');
        var rs = getComputedStyle(r);
        r.style.setProperty('--main-body-color', '#0B032D');
        r.style.setProperty('--danger-color', '#9C0D38');
    }
    else if(!userData["quit_started"]){}
    else{
        quitButton.classList.add('hidden');
        quitText.classList.remove('hidden');
        var r = document.querySelector(':root');
        var rs = getComputedStyle(r);
        r.style.setProperty('--main-body-color', '#3A7D44');
    }
}


// add relevant listeners
quitButton.addEventListener('pointerdown',()=>{
    quitStartTime = new Date(); 
    // console.log(quitStartTime);
    userData['quit_started'] = quitStartTime;
    userData["last_craving"] = quitStartTime;
    userData["last_smoked"] = quitStartTime;
    newCalendarData("quit","green");
    quittingToggle();
    save();
    showStaticData();
    location.reload();
})

craveButton.addEventListener('pointerdown',()=>{
    let newCrave = new Date();
    userData["last_craving"] = newCrave;
    lastCraving = userData["last_craving"];
    newCalendarData("craving","orange",5);
    save();
    showStaticData();
    location.reload();
})

// reset settings if smoking button is pressed
smokedButton.addEventListener('pointerdown',()=>{
    let newCig = new Date();
    userData["quit_started"] = '';
    userData["last_smoked"] = newCig;
    lastCig = userData["last_smoked"];
    quittingToggle()
    newCalendarData("smoked","red",5);
    save();
    showStaticData();
    location.reload();

})

calendarButton.addEventListener('pointerdown',()=>{
    document.getElementById('calendar').classList.toggle('hidden_calendar');
    updateCalendar();


})


// make timers update while page is visible
window.addEventListener("load",()=>{
    showStaticData()
    setInterval(timeUpdate,3000);
    setInterval(dressCalendarElements,1000)
})