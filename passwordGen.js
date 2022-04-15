const WordCaseENUM = {"Random":0, "Upper":1, "Lower":2, "Camel":3, "RandomLetterCase":4};
Object.freeze(WordCaseENUM);

var DATA = PRESETS["Defualt"];
DATA.wordCase = WordCaseENUM[DATA.wordCase]

tmp = $_GET("Preset")
if(tmp!=null){
	DATA=PRESETS[tmp]
}

document.getElementById("passStyle").value = DATA["passStyle"];
document.getElementById("passwordCount").value = DATA["passwordCount"];
document.getElementById("wordDictionary").value = DATA["wordDictionary"];
document.getElementById("wordSize").value = DATA["wordSize"];
document.getElementById("specialCharacters").value = DATA["specialCharacters"];
document.getElementById("customWord").value = DATA["customWord"];
document.getElementById("wordCase").value = DATA["wordCase"];

console.log(DATA)

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



function getPassword(inStyle = DATA["passStyle"], wordCase = DATA["wordCase"], passwordCount = DATA["passwordCount"], Dictionary = DATA["wordDictionary"], wordSize = DATA["wordSize"], API = false) {
// w = WORD : s = SPECIAL : i = INTEGER

	var PASSWORDLIST = "";
	var APIPasswords = {};

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
		APIPasswords[Object.keys(APIPasswords).length] = Pas;


	}
	if (API) return APIPasswords;
	return PASSWORDLIST;
}


function generatePasswords(DATA){

	document.getElementById("newSettings").value = ( JSON.stringify(DATA) );

	apiCall = "api.php?passStyle="+
		DATA["passStyle"] +
		"&passwordCount=" +
		DATA["passwordCount"] +
		"&wordCase=" +
		DATA["wordCase"] +
		"&wordDictionary=" +
		DATA["wordDictionary"] +
		"&wordSize=" +
		DATA["wordSize"] +
		"&specialCharacters=" +
		escape(DATA["specialCharacters"]) +
		"&customWord=" +
		DATA["customWord"];

	document.getElementById('apiCall').href = apiCall;

	var out = getPassword(DATA["passStyle"], DATA["wordCase"], DATA["passwordCount"], DATA["wordDictionary"], DATA["wordSize"]);
	document.getElementById("OUTPUT").innerHTML = out;
}

function APIRequest(passStyle = "w~w~wssiii", passwordCount = 1, wordCase = 3, wordDictionary = "Dictionary", wordSize = "20", specialCharacters = "!#$%&'()*+,-./:;<=>?@[]^`{|}", customWord = ""){
	DATA["passStyle"] = passStyle;
	DATA["passwordCount"] = passwordCount;
	DATA["wordDictionary"] = wordDictionary;
	DATA["wordSize"] = wordSize;
	DATA["specialCharacters"] = specialCharacters;
	DATA["customWord"] = customWord;

	switch (wordCase){
		case "0":
			DATA["wordCase"] = WordCaseENUM.Random;
			break;
		case "1":
			DATA["wordCase"] = WordCaseENUM.Upper;
			break;
		case "2":
			DATA["wordCase"] = WordCaseENUM.Lower;
			break;
		case "3":
			DATA["wordCase"] = WordCaseENUM.Camel;
			break;
		case "4":
			DATA["wordCase"] = WordCaseENUM.RandomLetterCase;
			break;
		}

	var tmp = getPassword(DATA["passStyle"], DATA["wordCase"], DATA["passwordCount"], DATA["wordDictionary"], DATA["wordSize"], false);
	// console.log(DATA)
	return tmp;
	//return JSON.stringify(tmp, null, '\n');
	document.innerHTML = JSON.stringify(tmp);
}

function generatePasswordsWithData(button=false){

	if(Object.keys($_GET("")).length == 0 || button == true){
		DATA["passStyle"] = document.getElementById("passStyle").value;
		DATA["passwordCount"] = document.getElementById("passwordCount").value;
		DATA["wordDictionary"] = document.getElementById("wordDictionary").value;
		DATA["wordSize"] = document.getElementById("wordSize").value;
		DATA["specialCharacters"] = document.getElementById("specialCharacters").value;
		DATA["customWord"] = document.getElementById("customWord").value;
	}

	switch (document.getElementById("wordCase").value){
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

	// console.log(DATA);
	generatePasswords(DATA);
}

function importSettings(_DATA = null){
	if(_DATA == null)
		DATA = JSON.parse(document.getElementById("newSettings").value);
	else
		DATA = _DATA
	
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

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function createSaveMenu(slotNumber){

	document.getElementById("saveSlotMenu").innerHTML = `
		<br><br>
		<form class="card" id="saveSlotMenu">
			<div class="card-body">
				<div class="form-group">
					<label for="slotName">Save Name</label>
					<input type="text" class="form-control" id="slotName">
				</div>
				<button type="submit" class="btn btn-primary" onclick="setSaveSlot(`+slotNumber+`)">Submit</button>
			</div>
		</form>
		<br><br>`;
}

function loadSaveSlot(slotNumber){
	data = JSON.parse(getCookie("SaveSlots"))
	if(data[slotNumber].Value == "") console.log("Empty Slot.....")
	else importSettings(data[slotNumber].Value)
}

function getSaveSlotNames(){
	
	data = getCookie("SaveSlots")
	
	if(data == ''){
		data = {
			0:{"Value":"", "Name":"[EMPTY SLOT]"}, 
			1: {"Value":"", "Name":"[EMPTY SLOT]"}, 
			2:{"Value":"", "Name":"[EMPTY SLOT]"}, 
			3:{"Value":"", "Name":"[EMPTY SLOT]"}
		};
	}else data = JSON.parse(data);

	document.getElementById("customPreset01Button").innerHTML = data[0].Name
	document.getElementById("customPreset02Button").innerHTML = data[1].Name
	document.getElementById("customPreset03Button").innerHTML = data[2].Name
	document.getElementById("customPreset04Button").innerHTML = data[3].Name
}

function setSaveSlot(slotNumber){

	data = getCookie("SaveSlots")
	
	if(data == ''){
		data = {
			0:{"Value":"", "Name":"[EMPTY SLOT]"}, 
			1: {"Value":"", "Name":"[EMPTY SLOT]"}, 
			2:{"Value":"", "Name":"[EMPTY SLOT]"}, 
			3:{"Value":"", "Name":"[EMPTY SLOT]"}
		};
	}else data = JSON.parse(data);

	console.log(data)

	data[slotNumber]["Value"] = DATA
	data[slotNumber]["Name"] = document.getElementById("slotName").value

	console.log(data)

	setCookie("SaveSlots", escape(JSON.stringify(data)));
	test = JSON.parse(unescape(getCookie("SaveSLots")))

	if(test[slotNumber].Value !== DATA) {
		test[slotNumber] = {};
		setCookie("SaveSlots", JSON.stringify(escape(test)), 30)
		alert("There was an issue saving these settings please try again.");
	}

}

function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

getSaveSlotNames();