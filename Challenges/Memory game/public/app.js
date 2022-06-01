let selectedCards = [];
let totalAttemps = 0;
let totalPairsFound = 0;
let start = null;
const userInfo = {
	name: "",
	time: 0,
	attemps: 0
}

const imagesArray = [
	{
		name: 'cheeseburger',
		img: 'img/cheeseburger.png',
	},
	{
		name: 'fries',
		img: 'img/fries.png',
	},
	{
		name: 'hotdog',
		img: 'img/hotdog.png',
	},
	{
		name: 'ice-cream',
		img: 'img/ice-cream.png',
	},
	{
		name: 'milkshake',
		img: 'img/milkshake.png',
	},
	{
		name: 'pizza',
		img: 'img/pizza.png',
	},
	{
		name: 'cheeseburger',
		img: 'img/cheeseburger.png',
	},
	{
		name: 'fries',
		img: 'img/fries.png',
	},
	{
		name: 'hotdog',
		img: 'img/hotdog.png',
	},
	{
		name: 'ice-cream',
		img: 'img/ice-cream.png',
	},
	{
		name: 'milkshake',
		img: 'img/milkshake.png',
	},
	{
		name: 'pizza',
		img: 'img/pizza.png',
	}
];

function startGame(){
	const username = document.getElementById('username').value;
	if(username.length < 4) document.getElementById('user-msg').textContent = '*At least 4 characters';
	else{
		userInfo.name = username;
		document.getElementById('register').style.display = 'none';
		setupBoard();
	}
}

function setupImagesArray(){
	imagesArray.sort(() => 0.5 - Math.random());
}

function setupBoard(){
	setupImagesArray();
	totalPairsFound = 0;
	totalAttemps = 0;
	updateScore(totalAttemps);
	start = Date.now();
	document.getElementById('main-board').style.display = 'flex';
	const board = document.querySelector('#board');
	board.innerHTML = "";
	for(let i=0; i<imagesArray.length; i++){
		board.appendChild( createCard(imagesArray[i], i) );
	}
}

function clickOnCardEvent(e){
	selectedCards.push(e.target);
	e.target.setAttribute('src', imagesArray[e.target.id].img);
	if(selectedCards.length == 2) checkMatch();
}

function createCard(image, i){
	const card = document.createElement('img');
	card.setAttribute('src', 'img/blank.png');
	card.setAttribute('id', i);
	card.setAttribute('alt', image.name);
	card.addEventListener('click', clickOnCardEvent);
	return card;
}

function checkMatch() {
	let [cardOne, cardTwo] = selectedCards;
	if(cardOne.id == cardTwo.id){
		alert("You can't select the same card");
		selectedCards.pop();
	}
	else if(imagesArray[cardOne.id].name == imagesArray[cardTwo.id].name){
		totalPairsFound++;
		handleSelectedCards(true);
	}
	else
		handleSelectedCards(false);
}

function updateScore(num){
	document.getElementById('score').innerHTML = num;
}

function handleSelectedCards(flag){
	updateScore(++totalAttemps);

	if(flag){

		selectedCards.forEach(card => {

			console.log(card)
			card.setAttribute('class', 'dead-img');
			card.removeEventListener('click', clickOnCardEvent);

		});
		finishGame();
		selectedCards = [];
	}

	else{
		document.getElementById('feedback').textContent = 'X wrong choice';
		document.getElementById('feedback').style.color = 'red';

		setTimeout(() => {
			
			selectedCards.forEach( card => {
				card.src = 'img/blank.png';
			});

			document.getElementById('feedback').textContent = 'Select a pair';
			document.getElementById('feedback').style.color = 'black';
			selectedCards = [];

		},1200);	
	}
}

function finishGame(){
	if(totalPairsFound < 6) return;

	document.getElementById('main-board').style.display = 'none';
	document.getElementById('rank').style.display = 'flex';
	userInfo.attemps = totalAttemps;
	userInfo.time = Math.round((Date.now() - start) / 1000);

	fetch(
		'/api/rank', 
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
		}
	).then(response => response.json())
	 .then(usersRank => {
			const rankContainer = document.getElementById('rank-container');
			usersRank.data.sort((a, b) => a.time - b.time);
			usersRank.data.forEach((user, index) => rankContainer.append( createPosition(user, index) ));
		});
}

function createPosition(user, index){
	const tr = document.createElement('tr');
	const pos = document.createElement('td');
	pos.textContent = index+1;
	const name = document.createElement('td');
	name.textContent = user.name;
	const time = document.createElement('td');
	let min = Math.floor(user.time/60);
	let sec = Math.floor(user.time%60);
	time.textContent = `${min/10 < 1 ? '0'+min : min}: ${sec/10 < 1 ? '0'+sec : sec}`;
	const attemps = document.createElement('td');
	attemps.textContent = user.attemps;

	tr.append(pos,name,attemps,time);
	return tr;
}