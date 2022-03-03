class Book{
	static instances = {};
	constructor(bookObj){
		this.isbn = bookObj.isbn;
		this.title = bookObj.title;
		this.year = bookObj.year;
	}
	static add(bookObj){
		Book.instances[bookObj.isbn] = new Book(bookObj);
		console.log(`Book ${bookObj.isbn} added.`);
	}
	static loadFromLocal(){
		let localString = "";
		try{
			if(localStorage["books"]){
				localString = localStorage["books"];
			}
		}
		catch(e){
			console.log("Error loading from local "+e);
		}
		if(localString){
			const booksLoaded = JSON.parse(localString);
			const keys = Object.keys(booksLoaded);
			console.log(`${keys.length} books loaded.`);
			for(const key of keys){
				Book.add(booksLoaded[key]);
			}
		}
	}
	static saveToLocal(){
		try{
			localStorage["books"] = JSON.stringify(Book.instances);
			console.log(`${Object.keys(Book.instances).length} saved to local.`);
		}
		catch(e){
			console.log("Error saving to local: "+e);
		}
	}
	static destroy(isbn){
		if(Book.instances[isbn]){
			delete Book.instances[isbn];
			console.log(`Book ${isbn} deleted.`);
		}
		else{
			console.log(`No book with isbn: ${isbn} found.`);
		}
	}
	static clearAll(){
		if(confirm("Are you sure?")){
			localStorage["books"] = "{}";
			Book.instances = {};
		}
	}
}