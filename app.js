var questions = [
    {
        question: "Pakistan came into being in:",
        answer: "1947",
        options: [
            "1948",
            "1947",
            "1945",
            "1950"
        ]
    },
    {
        question: "Who is the current president of pakistan?",
        answer: "Arif Alvi",
        options: [
            "Asif ali zardari",
            "Imran khan",
            "Arif Alvi",
            "Nawaz sharif",
        ]
    },
    {
        question: "Who is the current prime minister of Pakistan?",
        answer: "Imran khan",    
        options: [
            "Asif ali zardari",
            "Imran khan",
            "Arif Alvi",
            "Nawaz sharif",
        ]
    },
    {
        question: "2+2=?",
        answer: "4",
        options: [      
            "4",
            "8",
            "2",
            "5",
        ]
    },
    {
        question: "5x5=?",
        answer: "25",
        options: [        
            "25",
            "29",
            "40",
            "50",
        ]
    }   
]
var seconds = 0
var minutes = 0
var answers = []
var qNum = 0;
var quizHeader = document.getElementById("quizHeader")
var quizBody = document.getElementById("quizBody")
var formattedSec = "00"
var formattedMin = "00"

var interval = ''
function activeOpt(e){
    var ul = document.getElementById('option_group')
    for(var i=0; i<questions[qNum].options.length; i++){
        if(ul.childNodes[i].className === 'active')
            ul.childNodes[i].classList.remove('active')
            ul.childNodes[i].className = 'option'
    }
    e.className = 'active'
    if(e.innerHTML === questions[qNum].answer)
        answers[qNum] = true
    else
        answers[qNum] = false
}

function nxtQuestion(){
    if(!(typeof answers[qNum] === 'undefined')){    
        if(qNum < questions.length-1){
            qNum++
            appendQuestion()
        }
        else{
            qNum=0
            appendResult()
        }
    }
    else
        alert("Please select an option")
}

function appendQuestion(){
    quizHeader.innerHTML = "<h3 class='quizHeader'>Q" + (qNum+1) + "/" + questions.length + "</h3><span id='timer'>" + formattedMin + ':' + formattedSec + "</span>"
    var divBody = "<h3 class='quizHeader'>Q: " + questions[qNum].question + "</h3>"
    divBody += "<ul class='option_group' id='option_group'>"
    for(var i=0; i<questions[qNum].options.length; i++){
        divBody += "<li class='option' onclick='activeOpt(this)'>" + questions[qNum].options[i] + "</li>";
    }
    divBody += "</ul>"
    divBody += "<button class='btn btn-primary nxtBtn' onclick='nxtQuestion()'>Next question</button>"
    quizBody.innerHTML = divBody
}

function appendResult(){
    var correctQ = 0;
    document.getElementById("exitBtn").style.display = "none"
    clearInterval(interval)
    quizHeader.innerHTML = "<h3>Result</h3>"
    quizHeader.style.justifyContent = "center"
    var divBody = "<Table class='table table-bordered'><thead class='thead-dark'>"
    for(var i=0; i<questions.length; i++)
        divBody += "<th>Q" + (i+1) + "</th>"
    divBody += "</thead><tbody>"
    for(var i=0; i<questions.length; i++){
        if(answers[i]){
            divBody += "<td><img style='width:20px' src='Images/check.png'></td>"
            correctQ++
        }
        else
            divBody += "<td><img style='width:20px' src='Images/cancel.png'></td>"
    }
    divBody += "</tbody></table>"   
    
    divBody += "<Table class='table table-bordered'><thead class='thead-dark'>"
    divBody += "<th>Points</th>"
    divBody += "<th>Percentage</th>"
    divBody += "<th>Time Taken (mm:ss)</th>"
    divBody += "</thead><tbody>"
    divBody += "<td>" + correctQ + "/" + questions.length + "</td>"
    divBody += "<td>" + (correctQ/questions.length)*100 + "%" + "</td>"
    divBody += "<td>" + formattedMin + ':' + formattedSec + "</td>"
    divBody += "</tbody></table>"   

    divBody += "<button class='btn btn-primary rstBtn' onclick='window.location.reload()'>Re-attempt Quiz</button>"
    quizBody.innerHTML = divBody
}

function startQuiz(){
    document.getElementById("mainBody").style.display = "flex"
    document.getElementById("startBtn").style.display = "none"
    document.getElementById("adminPanel").style.display = "none"
    
    appendQuestion()
    var interval = setInterval(function(){
        if(seconds<59){
            seconds++
        }
        else{
            seconds = 0
            if(minutes<59) 
                minutes++
            else{
                minutes = 0
                clearInterval(interval)
                appendResult()
            }
        }
        formattedSec = seconds<10 ? '0' + seconds : seconds
        formattedMin = minutes<10 ? '0' + minutes : minutes
        document.getElementById("timer").innerHTML = (formattedMin + ':' + formattedSec)
    }, 1000)
       
}

function adminPanel(){
    document.getElementById("mainBody").style.display = "none"
    document.getElementById("startBtn").style.display = "none"
    document.getElementById("adminPanel").style.display = "none"   

    
}