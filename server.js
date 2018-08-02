const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
let stringifyFile;

app.use(bodyParser.json());

fs.readFile('./test.json', 'utf-8', function(err, data){
	if (err) throw err;
	stringifyFile=data;
	console.log(stringifyFile);
});


app.get('/getNote', function(req, res){
	fs.readFile('./test.json', 'utf-8', function(err, data){
	if (err) throw err;
	stringifyFile=data;
	res.send(data);
	});
});

app.post('/updateNote/:note', function(req, res) {

		parsedFile = JSON.parse(stringifyFile);
		parsedFile.note = req.params.note;
		stringifyFile = JSON.stringify(parsedFile);
		
	fs.writeFile('./test.json', stringifyFile, function(err) {
	    if (err) throw err;
	    console.log('file updated');
	});
	res.send('test.json po dodaniu notatki: ' + stringifyFile);
});

const server = app.listen(3000);

app.use(function(req, res, next){
	res.status(404).send('Nie ma tego, czego szukasz')
});