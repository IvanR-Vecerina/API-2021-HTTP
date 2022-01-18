var Chance = require('chance');
var chance = new Chance();

// console.log("Bonjour " + chance.name());

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send( generatePasswords() );
});

app.listen(3000, function () {
    console.log('Accepting HTTP requests on port 3000');
});

function generatePasswords() {
	var numberOfPasswords = chance.integer({
		min: 4,
		max: 10
	});
	
	console.log(numberOfPasswords);
	
	var passwords = [];
	
	// generate unassociated elements (for addresses) in Italy
	for (var i = 0; i < numberOfPasswords; i++) {
        var numberOfCharacters = chance.integer({
            min: 8,
            max: 20
        });

        let password = "";

        for (var j = 0; j < numberOfCharacters; j++) {
        
            password += chance.character();
        }

        passwords.push({password: password});

	}
	
	console.log(passwords);
	
	return passwords;
}