var username_table = []

function displayBoard() {
    var table = document.getElementById("leaderboard");

    for (let i = 0; i < username_table.length; i++) {
        username_table[i];
        var row = table.insertRow(1);
        var name = row.insertCell(0);
        var questions_right = row.insertCell(1);
        var questions_wrong = row.insertCell(2);
        var question_accuracy = row.insertCell(3);
        var total_time = row.insertCell(4);

        name.innerHTML = username_table[i][0];
        questions_right.innerHTML = username_table[i][1];
        questions_wrong.innerHTML = username_table[i][2];
        question_accuracy.innerHTML = username_table[i][3];
        total_time.innerHTML = username_table[i][4];
      }

  }

  function callAPI() {

    const jsonSend = { "dummy_data": "test"}

    // Get the reciever endpoint from Python using fetch:
    fetch("https://hackermerced-api.herokuapp.com/get_usernames", 
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
            username_table = jsonResponse['usernames_package']
            displayBoard() 
        } 
    ).catch((err) => console.error(err));
}

window.onload = callAPI
