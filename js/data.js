console.log('loaded')
let userData = localStorage.getItem('userData')? JSON.parse(localStorage.getItem('userData')):
{"quit_started":'',
    "last_craving":'',
    "last_smoked":'',
    "activity_log":{"events":[]}
} ;

console.log(userData)