const question_title = document.getElementById("question_title")
const question_lesson = document.getElementById("question_lesson")
const question_desc = document.getElementById("question_desc")
const question_a = document.getElementById("question_a")
const question_b = document.getElementById("question_b")
const question_c = document.getElementById("question_c")
const question_d = document.getElementById("question_d")

const submitButton = document.getElementById("submitButton")

const resultCorrect = document.getElementById("resultCorrect")
const resultCorrectSub = document.getElementById("resultCorrectSub")
const resultWrong = document.getElementById("resultWrong")
const nextButton = document.getElementById("nextButton")

var trackValue = getQueryVariable("track"); // Retriving value from link

// Houses ids for diffrent questions
var trackDict = {
    "1": ["11", "12", "13", "14", "15"],
    "2": ["21", "22", "23", "24", "25"],
    "3": ["31", "32", "33", "34", "35"],
    "4": ["41", "42", "43", "44", "45"],
    "5": ["51", "52", "53", "54", "55"],
    "6": ["61", "62", "63", "64", "65"],
    "7": ["71", "72", "73", "74", "75"],
    "8": ["81", "82", "83", "84", "85"],
    "9": ["91", "92", "93", "94", "95"],
    "10": ["101", "102", "103", "104", "105"],
    "11": ["111", "112", "113", "114", "115"],
    "12": ["121", "122", "123", "124", "125"],
  };

// Global id var to be changed
var question_id_index = 0
var userSelection = null
var correctAnswer = null
var scoreValue = 0
var timeValue = 0

var correctAnswerDict = {}

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



function changeAnswer(letter) {
    userSelection = letter
    if (userSelection == 'a') {
        question_a.classList.add('primary');

        question_b.classList.remove('primary')
        question_c.classList.remove('primary')
        question_d.classList.remove('primary')

    } else if (userSelection == 'b') {
        question_b.classList.add('primary')

        question_a.classList.remove('primary')
        question_c.classList.remove('primary')
        question_d.classList.remove('primary')

    } else if (userSelection == 'c') {
        question_c.classList.add('primary')

        question_a.classList.remove('primary')
        question_b.classList.remove('primary')
        question_d.classList.remove('primary')

    } else {
        question_d.classList.add('primary')

        question_a.classList.remove('primary')
        question_b.classList.remove('primary')
        question_c.classList.remove('primary')
    }
}

function callAPI() {

    // Create an array of keys to send to the server:
    var question_id = trackDict[trackValue][question_id_index]
    const jsonSend = { "question_id":question_id}

    // Get the reciever endpoint from Python using fetch:
    fetch("https://hackermerced-api.herokuapp.com/", 
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
            question_title.innerHTML = jsonResponse["question_title"]
            question_lesson.innerHTML = jsonResponse["question_lesson"]
            question_desc.innerHTML = jsonResponse["question_desc"]
            question_a.innerHTML = jsonResponse["question_a"]
            question_b.innerHTML = jsonResponse["question_b"]
            question_c.innerHTML = jsonResponse["question_c"]
            question_d.innerHTML = jsonResponse["question_d"]

            correctAnswer = jsonResponse["answer"]
            correctAnswerDict = {
                "a": jsonResponse["question_a"],
                "b": jsonResponse["question_b"],
                "c": jsonResponse["question_c"],
                "d": jsonResponse["question_d"]
            }
        } 
    ).catch((err) => console.error(err));
}

nextButton.onclick = function() {
    question_a.classList.remove('primary');
    question_b.classList.remove('primary')
    question_c.classList.remove('primary')
    question_d.classList.remove('primary')

    question_a.classList.remove('correct');
    question_b.classList.remove('correct')
    question_c.classList.remove('correct')
    question_d.classList.remove('correct')

    question_a.classList.remove('correct_r');
    question_b.classList.remove('correct_r')
    question_c.classList.remove('correct_r')
    question_d.classList.remove('correct_r')

    question_a.classList.remove('wronge');
    question_b.classList.remove('wronge')
    question_c.classList.remove('wronge')
    question_d.classList.remove('wronge')

    question_a.classList.remove('wronge_r');
    question_b.classList.remove('wronge_r')
    question_c.classList.remove('wronge_r')
    question_d.classList.remove('wronge_r')

    // Hidden result
    resultCorrect.style.display = 'none';
    resultWrong.style.display = 'none'
    resultCorrectSub.style.display = 'none';
    nextButton.style.display = 'none';
    submitButton.style.display = 'block'

    question_id_index = question_id_index + 1
    if (question_id_index >= 5) {
        console.log('The track has reached its end')
        // Simulate an HTTP redirect:
        window.location.replace("results.html?scoreValue=" + scoreValue + "&timeValue=" + timeValue);
    } else {
        callAPI()
    }
}

// Create an event listener on the button element:
submitButton.onclick = function() {

    if (userSelection == null) {
        // Need to select input
        console.log('Need to select input')
    } else {

        if (userSelection == correctAnswer) {
            console.log('You have the correct answer')
            if (userSelection == 'a') {
                question_a.classList.remove('primary');
                question_b.classList.remove('primary')
                question_c.classList.remove('primary')
                question_d.classList.remove('primary')

                question_a.classList.add('correct')
                
                question_b.classList.add('correct_r')
                question_c.classList.add('correct_r')
                question_d.classList.add('correct_r')

                // Increasing score
                scoreValue = scoreValue + 1

                // Hidden result
                resultCorrect.innerHTML = "Great Job!"
                resultCorrectSub.innerHTML = "The correct answer is: " + correctAnswerDict[correctAnswer]
                resultCorrect.style.display = 'block';
                resultCorrectSub.style.display = 'block';
                nextButton.style.display = 'block';
                submitButton.style.display = 'none'
                
        
            } else if (userSelection == 'b') {
                question_b.classList.add('primary')
        
                question_a.classList.remove('primary')
                question_c.classList.remove('primary')
                question_d.classList.remove('primary')

                question_b.classList.add('correct')
                
                question_a.classList.add('correct_r')
                question_c.classList.add('correct_r')
                question_d.classList.add('correct_r')

                // Increasing score
                scoreValue = scoreValue + 1

                // Hidden result
                resultCorrect.innerHTML = "Great Job!"
                resultCorrectSub.innerHTML = "The correct answer is: " + correctAnswerDict[correctAnswer]
                resultCorrect.style.display = 'block';
                resultCorrectSub.style.display = 'block';
                nextButton.style.display = 'block';
                submitButton.style.display = 'none'
        
            } else if (userSelection == 'c') {
                question_c.classList.add('primary')
        
                question_a.classList.remove('primary')
                question_b.classList.remove('primary')
                question_d.classList.remove('primary')

                question_c.classList.add('correct')
                
                question_a.classList.add('correct_r')
                question_b.classList.add('correct_r')
                question_d.classList.add('correct_r')

                // Increasing score
                scoreValue = scoreValue + 1  

                // Hidden result
                resultCorrect.innerHTML = "Great Job!"
                resultCorrectSub.innerHTML = "The correct answer is: " + correctAnswerDict[correctAnswer]
                resultCorrect.style.display = 'block';
                resultCorrectSub.style.display = 'block';
                nextButton.style.display = 'block';
                submitButton.style.display = 'none'
        
            } else {
                question_d.classList.add('primary')
        
                question_a.classList.remove('primary')
                question_b.classList.remove('primary')
                question_c.classList.remove('primary')

                question_d.classList.add('correct')
                
                question_a.classList.add('correct_r')
                question_b.classList.add('correct_r')
                question_c.classList.add('correct_r')

                // Increasing score
                scoreValue = scoreValue + 1

                // Hidden result
                resultCorrect.innerHTML = "Great Job!"
                resultCorrectSub.innerHTML = "The correct answer is: " + correctAnswerDict[correctAnswer]
                resultCorrect.style.display = 'block';
                resultCorrectSub.style.display = 'block';
                nextButton.style.display = 'block';
                submitButton.style.display = 'none'
            }

        } 
        
        else {
            console.log('You have the wronge answer')
            if (userSelection == 'a') {
                question_a.classList.remove('primary');
                question_b.classList.remove('primary')
                question_c.classList.remove('primary')
                question_d.classList.remove('primary')

                question_a.classList.add('wronge')
                
                question_b.classList.add('wronge_r')
                question_c.classList.add('wronge_r')
                question_d.classList.add('wronge_r')

                // Hidden result
                resultWrong.innerHTML = "Wrong Answer..."
                resultCorrectSub.innerHTML = "The correct answer is: " + correctAnswerDict[correctAnswer]
                resultWrong.style.display = 'block';
                resultCorrectSub.style.display = 'block';
                nextButton.style.display = 'block';
                submitButton.style.display = 'none'
        
            } else if (userSelection == 'b') {
                question_b.classList.add('primary')
        
                question_a.classList.remove('primary')
                question_c.classList.remove('primary')
                question_d.classList.remove('primary')

                question_b.classList.add('wronge')
                
                question_a.classList.add('wronge_r')
                question_c.classList.add('wronge_r')
                question_d.classList.add('wronge_r')

                // Hidden result
                resultWrong.innerHTML = "Wrong Answer..."
                resultCorrectSub.innerHTML = "The correct answer is: " + correctAnswerDict[correctAnswer]
                resultWrong.style.display = 'block';
                resultCorrectSub.style.display = 'block';
                nextButton.style.display = 'block';
                submitButton.style.display = 'none'
        
            } else if (userSelection == 'c') {
                question_c.classList.add('primary')
        
                question_a.classList.remove('primary')
                question_b.classList.remove('primary')
                question_d.classList.remove('primary')

                question_c.classList.add('wronge')
                
                question_a.classList.add('wronge_r')
                question_b.classList.add('wronge_r')
                question_d.classList.add('wronge_r')

                // Hidden result
                resultWrong.innerHTML = "Wrong Answer..."
                resultCorrectSub.innerHTML = "The correct answer is: " + correctAnswerDict[correctAnswer]
                resultWrong.style.display = 'block';
                resultCorrectSub.style.display = 'block';
                nextButton.style.display = 'block';
                submitButton.style.display = 'none'
        
            } else {
                question_d.classList.add('primary')
        
                question_a.classList.remove('primary')
                question_b.classList.remove('primary')
                question_c.classList.remove('primary')

                question_d.classList.add('wronge')
                
                question_a.classList.add('wronge_r')
                question_b.classList.add('wronge_r')
                question_c.classList.add('wronge_r')

                // Hidden result
                resultWrong.innerHTML = "Wrong Answer..."
                resultCorrectSub.innerHTML = "The correct answer is: " + correctAnswerDict[correctAnswer]
                resultWrong.style.display = 'block';
                resultCorrectSub.style.display = 'block';
                nextButton.style.display = 'block';
                submitButton.style.display = 'none'
            }
        }

    }


}

function incrementSeconds() {
    timeValue += 1;
}

setInterval(incrementSeconds, 1000);

window.onload = callAPI    // Call API function on initial load