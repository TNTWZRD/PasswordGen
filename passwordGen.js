const WordCaseENUM = {"Random":0, "Upper":1, "Lower":2, "Camel":3, "RandomLetterCase":4};
Object.freeze(WordCaseENUM);

var DATA = {
	"passStyle":"w~w~wssiii",
	"wordCase":WordCaseENUM.Random,
	"passwordCount":1,
	"wordDictionary":"CommonDictionary",
	"wordSize":"20",
	"specialCharacters":"!#$%&'()*+,-./:;<=>?@[]^`{|}",
	"customWord":""
};

function RandomInt(MaxInt = 9, MinInt = 0){
	return Math.floor(Math.random()*(MaxInt-MinInt))+MinInt;
}

function RandomWord(MaxSize = DATA["wordSize"], MinSize = 0, Dictionary = DATA["wordDictionary"]){ // Returns random word with maxSize and minSize

	if (Dictionary == "CommonDictionary"){
		var WordDictionary = CommonDictionary;
	}else if(Dictionary == "Dictionary"){
		var WordDictionary = UncommonDictionary;
	}

	while (true){
		word = WordDictionary[RandomInt(WordDictionary.length)];
		if (word.length <= MaxSize && word.length > MinSize){ return word;}
	}
}

function RandomSpecial(count = 1, special = DATA["specialCharacters"]) {
	OUT = "";
	for(i=0;i<count;i++){
		OUT += special[RandomInt(special.length)];
	}
	return OUT;
}

function CamelCaseWord(word) {
	return word[0].toUpperCase() + word.substr(1, word.length-1);
}

function RandomLetterCase(word) {
	var out = "";
	for (var i = 0; i < word.length; i++) {
		if(Math.round(Math.random())){
			out += word[i].toUpperCase();
		}else{
			out += word[i];
		}
	}
	return out;
}

function RandomCase(word){
	pick = RandomInt(4);
	switch (pick) {
	case 0:
		return word.toUpperCase();
	case 1:
		return word.toLowerCase();
	case 2:
		return CamelCaseWord(word);
	case 3:
		return RandomLetterCase(word);
	}
}



function getPassword(inStyle = DATA["passStyle"], wordCase = DATA["wordCase"], passwordCount = DATA["passwordCount"], Dictionary = DATA["wordDictionary"], wordSize = DATA["wordSize"]) {
// w = WORD : s = SPECIAL : i = INTEGER

	var PASSWORDLIST = "";

	for (k = 0; k < passwordCount; k++) {
		// MAKE PASSWORD
		var Pas = "";
		for (j = 0; j < inStyle.length; j++) { // Get each char in [inStyle]
			switch (inStyle[j]) {
				
				case 'w': //WORD
					switch (wordCase){
					case WordCaseENUM.Random: //RandomCase
						Pas += RandomCase(RandomWord(wordSize, 0, Dictionary));
						//console.log("Random");
						break;
					case WordCaseENUM.Upper: //Upper Case
						Pas += RandomWord(wordSize, 0, Dictionary).toUpperCase();
						//console.log("Upper");
						break;
					case WordCaseENUM.Lower: //Lower Case
						Pas += RandomWord(wordSize, 0, Dictionary).toLowerCase();
						//console.log("Lower");
						break;
					case WordCaseENUM.Camel: //Camel
						Pas += CamelCaseWord(RandomWord(wordSize, 0, Dictionary));
						//console.log("Camel");
						break;
					case WordCaseENUM.RandomLetterCase: //Camel
						Pas += RandomLetterCase(RandomWord(wordSize, 0, Dictionary));
						//console.log("RandomLetter");
						break;
					};
				break;

				case 's': //SPECIAL
					
					Pas += RandomSpecial();

					break;

				case 'i': //INTEGER
					
					Pas += RandomInt();

					break;

				case '~': //INTEGER
					
					Pas += "_";

					break;

				case '@': //CUSTOM WORD
					
					Pas += DATA["customWord"];

					break;

			}
		}
		//console.log(Pas);
		PASSWORDLIST = PASSWORDLIST + Pas + " <br> ";

	}

	return PASSWORDLIST;
}


function generatePasswords(DATA){

	document.getElementById("newSettings").value = ( JSON.stringify(DATA) );

	console.log(DATA);
	var out = getPassword(DATA["passStyle"], DATA["wordCase"], DATA["passwordCount"], DATA["wordDictionary"], DATA["wordSize"]);
	document.getElementById("OUTPUT").innerHTML = out;
}

function generatePasswordsWithData(){
	DATA["passStyle"] = document.getElementById("passStyle").value;
	DATA["passwordCount"] = document.getElementById("passwordCount").value;
	DATA["wordCase"] = document.getElementById("wordCase").value;
	DATA["wordDictionary"] = document.getElementById("wordDictionary").value;
	DATA["wordSize"] = document.getElementById("wordSize").value;
	DATA["specialCharacters"] = document.getElementById("specialCharacters").value;
	DATA["customWord"] = document.getElementById("customWord").value;

	switch (DATA["wordCase"]){
	case "Random":
		DATA["wordCase"] = WordCaseENUM.Random;
		break;
	case "Uppercase":
		DATA["wordCase"] = WordCaseENUM.Upper;
		break;
	case "Lowercase":
		DATA["wordCase"] = WordCaseENUM.Lower;
		break;
	case "Camelcase":
		DATA["wordCase"] = WordCaseENUM.Camel;
		break;
	case "RandomLetterCase":
		DATA["wordCase"] = WordCaseENUM.RandomLetterCase;
		break;
	}

	generatePasswords(DATA);
}

function importSettings(){
	DATA = JSON.parse(document.getElementById("newSettings").value);
	
	document.getElementById("passStyle").value = DATA["passStyle"]
	document.getElementById("passwordCount").value = DATA["passwordCount"];
	document.getElementById("wordDictionary").value = DATA["wordDictionary"];
	document.getElementById("wordSize").value = DATA["wordSize"];
	document.getElementById("specialCharacters").value = DATA["specialCharacters"];
	document.getElementById("customWord").value = DATA["customWord"];

	generatePasswords(DATA);

	switch (DATA["wordCase"]){
	case 0:
		DATA["wordCase"] = "Random";
		break;
	case 1:
		DATA["wordCase"] = "Uppercase";
		break;
	case 2:
		DATA["wordCase"] = "Lowercase";
		break;
	case 3:
		DATA["wordCase"] = "Camelcase";
		break;
	case 4:
		DATA["wordCase"] = "RandomLetterCase";
		break;
	}
	document.getElementById("wordCase").value = DATA["wordCase"];

}