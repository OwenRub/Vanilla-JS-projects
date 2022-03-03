
window.addEventListener("load", () => {
	Book.loadFromLocal();
	listBooks();
	const crtBtn = document.forms["create-book"].elements["commit"];	
	const dltBtn = document.forms["delete-book"].elements["dltBtn"];
	const clrBtn = document.forms["delete-book"].elements["clrBtn"];
	crtBtn.addEventListener("click", saveBtnEvent);
	dltBtn.addEventListener("click", deleteBtnEvent);
	clrBtn.addEventListener("click", clearBtnEvent);
});
window.addEventListener("beforeunload", () => { Book.saveToLocal(); });

const saveBtnEvent = () => {
	const formCreate = document.forms["create-book"];
	const book = {
		isbn: formCreate.isbn.value,
		title: formCreate.title.value,
		year: formCreate.year.value,
	};
	Book.add(book);
	listBooks();
	formCreate.reset();
};

const deleteBtnEvent = () => {
	const formDeleteValue = document.forms["delete-book"].elements["dltList"].value;
	Book.destroy(formDeleteValue);
	listBooks();
};

const clearBtnEvent = () => {
	Book.clearAll();
	listBooks();
}

function listBooks(){
	const tableBody = document.querySelector("table#book-list>tbody");
	tableBody.innerHTML = "";
	const dltList = document.forms["delete-book"].elements["dltList"];
	dltList.innerHTML = "";
	let listStr = "";
	for(const key of Object.keys(Book.instances)){
		const book = Book.instances[key];
		const row = tableBody.insertRow();
		row.insertCell().textContent = book.isbn;
		row.insertCell().textContent = book.title;
		row.insertCell().textContent = book.year;
		listStr += `<option value="${book.isbn}">${book.title}</option>`;
	}
	dltList.innerHTML = listStr;
}