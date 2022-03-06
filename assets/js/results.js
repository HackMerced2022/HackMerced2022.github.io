const userScore = document.getElementById('userScore')
const userTime = document.getElementById('userTime')

var scoreValue = getQueryVariable("scoreValue"); // Retriving value from link
var timeValue = getQueryVariable("timeValue"); // Retriving value from link
var username = ''

accuracy = scoreValue / 5 * 100 
userScore.innerHTML = "Your Accuracy is: " + accuracy + "%"
userTime.innerHTML = "Time Taken: " + timeValue + " seconds"

// Retrive the variable in query
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++){
        var pair = vars[i].split("=");
        if (pair[0] == variable){
            return pair[1];
        }
    }
}

function getUsername() {
    // Get username from html
    username = document.getElementById('TextUsername').value;
    callAPI()

    
}

function callAPI() {
    // Call API for user ranking

    var jsonSend = {"username": username,
                    'questions_right': scoreValue,
                    'questions_wrong': 5 - scoreValue,
                    'question_accuracy': accuracy,
                    'total_time': timeValue}

    // Get the reciever endpoint from Python using fetch:
    fetch("https://hackermerced-api.herokuapp.com/leaderboard", 
        {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
            },
            // Strigify the payload into JSON:
            body:JSON.stringify(jsonSend)}).then(res=>{
                if(res.ok){
                    return res.json()
                }else{
                    alert("something is wrong")
                }
        }).then(jsonResponse=>{

            // Update html elements by id
            console.log(jsonResponse)
            window.location.replace("leaderboard.html?username=" + username);

        } 
    ).catch((err) => console.error(err));
}
