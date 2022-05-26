// quiz object (contains categories and questions) is encapsulated in a settle promise
const quizPromise = fetch('assets/questions.json')
  .then( response => response.json() )
  .then(quizObj => quizObj.quiz);

const userInformation = {
  name: '',
  score: 0,
  time: 0
};
const question = document.getElementById('question');
const options = document.getElementById('options');
let questionsList;
let currentQuestion = 0;
let timeStart;

changeBackground();

/* EVENT LISTENERS */

document.getElementById('play-btn').addEventListener('click', showCategories);

document.getElementById('user-name').addEventListener('keyup', event =>{

  const userMsg = document.getElementById('user-msg');
  userMsg.textContent = '';

  if(event.target.value.length < 4) {
    userMsg.textContent = 'too short';
    document.getElementById('play-btn').setAttribute('disabled','');
  }
  else document.getElementById('play-btn').removeAttribute('disabled');

})

/*  FUNCTIONS  */

// questions start to be displayed when the user chooses a category
function showCategories(){

  userInformation['name'] = document.getElementById('user-name').value;
  document.getElementById('registration').style.display = 'none';
  document.getElementById('categories').style.display = 'flex';

  const categoriesContainer = document.getElementById('categories');

  quizPromise.then(quiz => {
    
    Object.keys(quiz).forEach( category => {
      categoriesContainer.append( getDivElement(category, true) )
    });

  })

  categoriesContainer.addEventListener('click', setQuestionsList);
}

async function setQuestionsList(event){
  if(event.target.id) return;
  changeBackground();

  document.getElementById('categories').style.display = 'none';
  document.getElementById('trivia').style.display = 'block';

  questionsList = await quizPromise.then( quiz => quiz[event.target.textContent].sort(() => Math.random()-0.5) );
  timeStart = Date.now();
  displayQuestion();
}

function displayQuestion(){
  question.textContent = questionsList[currentQuestion].question;
  showOptions( questionsList[currentQuestion].options );
}

function showOptions(optionsList){
  options.innerHTML = '';
  optionsList.forEach(opt => options.append(getDivElement(opt, false)));
  options.addEventListener('click', checkAnswer);
}

function checkAnswer({ target }){
  if(target.id == 'options') return;

  if(target.textContent !== questionsList[currentQuestion].answer) target.classList.add('wrong');
  else userInformation.score++;

  document.getElementById('correctAnswer').classList.add('correct');

  options.removeEventListener('click', checkAnswer);

  setTimeout(() => {
    if(++currentQuestion >= questionsList.length) finishGame();
    else{
      changeBackground();
      displayQuestion();
    }
  }, 1600)
}

async function finishGame(){
  document.getElementById('trivia').style.display = 'none';
  document.getElementById('score-board').style.display = 'block';
  userInformation.time = Math.round((Date.now() - timeStart)/1000);  //save time in seconds

  const historyResponse = await fetch('/api/history', {
    method: 'POST',
    body: JSON.stringify(userInformation),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const usersHistory = await historyResponse.json();
  usersHistory.data.sort((a, b) => a.score - b.score).reverse();
  displayScoreBoard(usersHistory.data);
}

function displayScoreBoard(history){
  const scoreList = document.getElementById('score-list');
  history.forEach((obj, index) => scoreList.append( getTableData(obj, index) ));
}

function getTableData( { name, score, time }, index ){
  const tr = document.createElement('tr');
  const position = document.createElement('td');
  position.textContent = index+1;
  const user = document.createElement('td');
  user.textContent = name;
  const points = document.createElement('td');
  points.textContent = score;
  const totalTime = document.createElement('td');
  totalTime.textContent = getFormattedTime(time);

  tr.append(position,user,points,totalTime);

  return tr;
}

function getDivElement(content, isCategory){
  const div = document.createElement('div');
  div.textContent = content;

  if(!isCategory) {
    div.className = 'answer';
    if(content === questionsList[currentQuestion].answer) div.id = 'correctAnswer';
  }

  return div;
}

function getFormattedTime(time){
  let minutes = Math.floor(time/60);
  minutes = minutes/10 >= 1 ? minutes : `0${minutes}`;
  let seconds = time%60;
  seconds = seconds/10 >= 1 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`
}

function changeBackground(){
  document.getElementsByTagName('body')[0].style.backgroundColor = `hsl(${Math.round(Math.random()*360)}deg, 56%, 50%)`;
}