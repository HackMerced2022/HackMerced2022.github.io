const userScore = document.getElementById('userScore')
const userTime = document.getElementById('userTime')

var scoreValue = getQueryVariable("scoreValue"); // Retriving value from link
var timeValue = getQueryVariable("timeValue"); // Retriving value from link

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

scoreValue = scoreValue / 5 * 100
userScore.innerHTML = "Your Score Accuracy is: " + scoreValue + "%"
userTime.innerHTML = "Time Taken: " + timeValue + " seconds"