const loki = require('lokijs');
const express = require('express');

const db = new loki("history.db");
const usersHistory = db.getCollection("usersHistory") ?? db.addCollection("usersHistory");

const app = express();

app.use(express.static('public'));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening at ${port}`);
});


app.post('/api/history', (request, response) => {
	console.log(request.body)
	const newUser = request.body;
	usersHistory.insert(newUser);
	console.log(usersHistory)
	response.json({
		status: "success",
		data: usersHistory.data
	});
})
