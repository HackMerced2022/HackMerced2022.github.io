const quesiton_title = document.getElementById("question_title")




// Get the button and container elements from HTML:
const button = document.getElementById("submitButton")
const data = document.getElementById("info")
// Create an array of cars to send to the server:
const cars = { "question_id":"12"}

// Create an event listener on the button element:
button.onclick= function(){
 // Get the reciever endpoint from Python using fetch:
 fetch("https://hackermerced-api.herokuapp.com/", 
 {
 method: 'POST',
 headers: {
 'Content-type': 'application/json',
 'Accept': 'application/json'
 },
 // Strigify the payload into JSON:
 body:JSON.stringify(cars)}).then(res=>{
 if(res.ok){
 return res.json()
 }else{
 alert("something is wrong")
 }
 }).then(jsonResponse=>{
 
 // Log the response data in the console
 console.log(jsonResponse)
 quesiton_title.innerHTML = jsonResponse["question_title"]
 } 
 ).catch((err) => console.error(err));
 
 }

