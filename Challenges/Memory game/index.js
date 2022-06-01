const loki = require('lokijs');
const express = require('express');

const app = express();
const db = new loki('rank.db');
const rankHistory = db.getCollection('rankHistoy') ?? db.addCollection('rankHistory');

app.use(express.static('public'));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening at ${port}`);
});

app.post('/api/rank', (request, response) => {
  const userData = request.body;
  rankHistory.insert(userData);
  response.json({
    status: 'success',
    data: rankHistory.data
  });
})