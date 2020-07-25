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
questions_temp = 
    {
        question: "",
        answer: "",
        options: []
    }
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
    document.getElementById("adminBtn").style.display = "none"
    
    appendQuestion()
    interval = setInterval(function(){
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
function appendAllQuestions(){

}
function adminPanel(){
    document.getElementById("mainBody").style.display = "none"
    document.getElementById("startBtn").style.display = "none"
    document.getElementById("adminBtn").style.display = "none"  
    document.getElementById("mainPanel").style.display = "flex"
}

/*===============================Panel Add Remove Edit================================*/
var addingRec = false;
var rVal = "<li></li>";
var colors = ["#7acbbd", "#ffb72b", "#855fc1", "#ea4986", "#ff8737"]
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"]
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var colInd = 0;

function addQuestion(){
    if(!addingRec){
        addingRec = true;
        var questionsUl = document.getElementById("questionsUl")
        var optionsUl = document.createElement('ul')
        var li = document.createElement('li')
        var h3 = document.createElement('h3')
        var input = document.createElement('input')
        input.className = 'form-control w-75'
        input.required = 1;
        li.className = 'panelLi'
        li.style.listStyleType = "none"
        li.style.backgroundColor = "grey"
        li.style.borderRadius = "30px"
        li.style.setProperty("padding", "10px 30px", "important");
        optionsUl.style.width = "1000px"
        h3.innerHTML = "Q:&nbsp"
        li.appendChild(h3)
        li.appendChild(input)
        for(var i=0; i<4; i++){
            var optionsBody = "<li class='panelLi'><h3>Option " + (i+1) + ":&nbsp</h3><input class='form-control w-50'></li>"
            optionsUl.innerHTML += optionsBody
        }
        var ansLiHtml = "<li class='panelLi'><h3>Answer :&nbsp</h3><input class='form-control w-50'></li>"
        optionsUl.innerHTML += ansLiHtml
        var btnLiHtml = "<li style='display: flex; justify-content: center;'>"
        btnLiHtml += "<button class='btn btn-success liBtnTAdd fa fa-check' onclick='AddRec(this)'></button>"
        btnLiHtml += "<button class='btn btn-danger liBtnAdd fa fa-times' onclick='discardRec(this)'></button>"
        btnLiHtml += "</li>"
        optionsUl.innerHTML += btnLiHtml
        li.appendChild(optionsUl)
        questionsUl.appendChild(li)
    }
}
function discardRec(id){
    addingRec = false;
    id.parentNode.parentNode.parentNode.remove() 
}
function AddRec(id){
    var numOfOptns = id.parentNode.parentNode.childNodes.length-2
    var optionVals = []
    var questionVal = id.parentNode.parentNode.parentNode.childNodes[1].value
    for(var i=0; i<numOfOptns; i++)
        optionVals[i] = id.parentNode.parentNode.childNodes[i].childNodes[1].value
    var answerVal = id.parentNode.previousSibling.childNodes[1].value

    //check if any required field is empty
    if(!(questionVal === '') && !(answerVal === '')){
        var enteredOpt = 0;
        //check if atleast two options are entered
        for(var i=0; i<optionVals.length; i++){
            if(!(optionVals[i] === ''))
               enteredOpt++
            if(enteredOpt==2)
                break
        }
        if(enteredOpt != 2)
            alert("Please enter atleast two options")
        else{
            //check if the answer matches any of the options
            enteredOpt = 0
            for(var i=0; i<optionVals.length; i++){
                if(optionVals[i] === answerVal){
                    enteredOpt = 1
                    break
                }
            }
            if(!enteredOpt)
                alert("Please enter one of the options in Answer filed")
            else{
                addingRec = false;
                id.parentNode.parentNode.parentNode.remove()

                questions[questions.length] = questions_temp
                questions[questions.length-1].question = questionVal 
                questions[questions.length-1].answer = answerVal
                for(var i=0; i<numOfOptns; i++) 
                    questions[questions.length-1].options[i] = optionVals[i] 
                
                var divBody = "<li style='background-color: grey; border-radius: 30px; padding: 10px 30px !important; margin-bottom: 10px;'><h3 class='quizHeader'>Q" + questions.length + ":&nbsp" + questions[questions.length-1].question + "</h3>"
                divBody += "<ul class='option_group' id='option_group'>"
                for (var i = 0; i < questions[qNum].options.length; i++) {
                    if (questions[questions.length - 1].options[i] === questions[questions.length - 1].answer)
                        divBody += "<li class='optionPanel active' onclick=''>" + questions[questions.length - 1].options[i] + "</li>";
                    else
                        divBody += "<li class='optionPanel' onclick=''>" + questions[questions.length - 1].options[i] + "</li>";

                }
                divBody += "<li style='display: flex; justify-content: center;'>"
                divBody += "<button class='btn btn-success fa fa-pencil liBtn' onclick='EditRec(this)'></button>";
                divBody += "<button class='btn btn-danger fa fa-trash liBtn' onclick='EditRec(this)'></button></li>";
                divBody += "</ul><li>"
                questionsUl.innerHTML = divBody
            }
        }
    }
    else
        alert("Please fill the required fields")
}
function EditRec(id){
    if(!addingRec){
        addingRec = true;
        var inVal = id.parentNode.firstChild.innerHTML
        rVal = id.parentNode
        var questionsUl = document.getElementById("questionsUl")
        var nxtSib = id.parentNode.nextSibling
        var li = document.createElement('li')
        var input = document.createElement('input')
        var btnC = document.createElement('button')
        var btnU = document.createElement('button')
        btnU.className = "btn btn-success"
        btnC.className = "btn btn-danger"
        btnU.setAttribute('onclick', 'AddRec(this)')
        btnC.setAttribute('onclick', 'cancelUpdateRec(this)')
        btnU.textContent = 'Update'
        btnC.textContent = 'Cancel'
        input.className = 'form-control'
        input.value = inVal
        li.style.listStyleType = "none"
        li.appendChild(input)
        li.appendChild(btnU)
        li.appendChild(btnC)
        id.parentNode.remove()
        questionsUl.insertBefore(li, nxtSib)
    }
}
function cancelUpdateRec(id){
    addingRec = false;
    questionsUl.insertBefore(rVal, id.parentNode.nextSibling)
    id.parentNode.remove()
}
function DelAll(){
    addingRec = false;
    var questionsUl = document.getElementById("questionsUl")
    var first = questionsUl.firstElementChild;
    while (first) { 
        first.remove(); 
        first = questionsUl.firstElementChild;
    }
}
function showBtn(id){
    var btnE = id.getElementsByClassName('liBtn')[0]
    var btnD = id.getElementsByClassName('liBtn')[1]
    btnE.style.display = "inline"
    btnD.style.display = "inline"
}
function hideBtn(id){
    var btnE = id.getElementsByClassName('liBtn')[0]
    var btnD = id.getElementsByClassName('liBtn')[1]
    btnE.style.display = "none"
    btnD.style.display = "none"
}
