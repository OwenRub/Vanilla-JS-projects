// Variables - load data **
let counter = 0;
let notes = {};
loadDataFromLocal();

// event listeners **
const addButton = document.getElementById('btn');
addButton.addEventListener('click', addButtonEvent);
const cardsContainer = document.getElementById('notes-container');
cardsContainer.addEventListener('click', alterNote);
window.addEventListener('beforeunload', saveDataToLocal);

// Local storage related functions **

function loadDataFromLocal(){
	let unparsedData = "";
	try{
		if(localStorage["notes_data"]) unparsedData = localStorage["notes_data"];
	}
	catch(e){
		console.log('Error loading from local ' + e);
	}
	if(unparsedData){
		const notesObtained = JSON.parse(unparsedData);
		for(const k of Object.keys(notesObtained)){
			addNote(notesObtained[k]);
		}
		console.log(`${Object.keys(notes).length} notes loaded`);
	}
	retrieveNotes();
}

function saveDataToLocal(){
	let parsedData = JSON.stringify(notes);
	try{
		localStorage["notes_data"] = parsedData;
	}
	catch(e){
		console.log('Error saving to local ' + e);
	}
}

// User actions functions **

function addButtonEvent() {
	const noteForm = document.forms['note-form'];
	const title = noteForm.title.value;
	const content = noteForm.content.value;
	
	if(title || content){
		addNote({title,content});
		noteForm.reset();
	}
	else{
		document.getElementById('message').innerHTML = "Empty notes are not valid!";
	}
}

function addNote(obj){
	notes[++counter] = obj;
	retrieveNotes();
}

function retrieveNotes(){
	const notesContainer = document.getElementById('notes-container');
	notesContainer.innerHTML = "";
	for(const k of Object.keys(notes)){
		// Build every card
		const titleText = document.createTextNode(notes[k].title);
		const contentText = document.createTextNode(notes[k].content);
		const card = createCardElement(titleText, contentText, k);
		notesContainer.appendChild(card);
	}
}

function alterNote(event) {
	if(event.target.classList.contains('uil-trash-alt')){
		let firstParent = event.target.parentElement;
		let secondParent = firstParent.parentElement;

		let id = Number(secondParent.lastChild.innerHTML)
		console.log(`Note: ${notes[id].title} has been deleted`);
		delete notes[id];
		secondParent.remove();
	}
}

function createCardElement(titleText, contentText, key){
	// Create card Elements
	const card = document.createElement('div');
	card.classList.add('card');
	const cardHeader = document.createElement('div');
	cardHeader.classList.add('card-header')
	const title = document.createElement('h4')
	const deleteOption = document.createElement('i');
	deleteOption.classList.add('uil');
	deleteOption.classList.add('uil-trash-alt');
	deleteOption.classList.add('red');
	const content = document.createElement('p')
	const identifier = document.createElement('p');
	identifier.innerHTML = key;
	identifier.classList.add('hide');

	// Nest the elements
	title.appendChild(titleText);
	content.appendChild(contentText);
	cardHeader.appendChild(title);
	cardHeader.appendChild(deleteOption);
	card.appendChild(cardHeader);
	card.appendChild(content);
	card.appendChild(identifier);

	return card;
}