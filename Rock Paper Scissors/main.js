// Initialize the game variables
let totalWin = 0;
let totalDraw = 0;
let totalLoss = 0;
const options = ['Rock', 'Paper', 'Scissors'];
updateScoreBoard();

// Event listeners
const optionsElement = document.getElementById('options');
optionsElement.addEventListener('click', setUserChoice);
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', resetGame);
const playAgainButton = document.getElementById('play-again-btn');
playAgainButton.addEventListener('click', clearUserBoard);

//Functions
function setUserChoice(event){
	if(event.target.classList.contains('image-option')){
		event.target.classList.add('selected');
		let userChoice = event.target.alt;

		// The user can't select another option, only will be able if click 'play again'
		optionsElement.removeEventListener('click', setUserChoice);

		setWinner(userChoice, setMachineChoice());
	}
}

function setMachineChoice(){
	let machineChoice = options[Math.floor(Math.random()*3)];
	displayMachineChoice(machineChoice);
	return machineChoice;
}

function setWinner(userAnswer, machineAnswer){
	let difference = options.indexOf(userAnswer) - options.indexOf(machineAnswer);
	if (difference == 1 || difference == -2){
		totalWin++;
		showMessage("You win!");
	}
	else if(difference == 0){
		totalDraw++;
		showMessage("It's a draw!");
	}
	else{ 
		totalLoss++;
		showMessage("You lose :(");
	}

	updateScoreBoard();
}

function updateScoreBoard(){
	let winElement = document.getElementById("wins");
	winElement.innerHTML = totalWin;
	let drawElement = document.getElementById("draws");
	drawElement.innerHTML = totalDraw;
	let lossElement = document.getElementById("losses");
	lossElement.innerHTML = totalLoss;
}

function displayMachineChoice(answer){
	const elementForAnswer = document.getElementById('machine-answer');
	const imageForAnswer = document.createElement('img');
	imageForAnswer.src = `http://www1.lasalle.edu/~blum/c230wks/RockPaperScissors/${answer.charAt(0)}.jpg`;
	imageForAnswer.alt = answer;
	imageForAnswer.classList.add('selected-cpu');
	elementForAnswer.appendChild(imageForAnswer);
}

function clearUserBoard(){
	const imageElements = optionsElement.children;
	for(const img of imageElements){
		img.className = 'image-option';
	}
	document.getElementById('machine-answer').innerHTML = "";
	// Enable options again
	optionsElement.addEventListener('click', setUserChoice);
	showMessage("Choose...");
}

function resetGame(){
	totalWin = 0;
	totalDraw = 0;
	totalLoss = 0;

	clearUserBoard();
	updateScoreBoard();
}

function showMessage(msg){
	const message = document.getElementById("message");
	message.innerHTML = msg;
}