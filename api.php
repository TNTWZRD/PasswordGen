
<script src="CommonDictionary.js"></script>
<script src="Dictionary.js"></script>
<script src="passwordGen.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>

<script>
    var tmp = {"passStyle":"w~w~wssiii","wordCase":0,"passwordCount":"1","wordDictionary":"CommonDictionary","wordSize":"20","specialCharacters":"!#$%&'()*+,-./:;<=>?@[]^'{|}","customWord":""};
<?php
    if(isset($_GET['passStyle'])){
        echo 'tmp["passStyle"] = "'.$_GET['passStyle'].'";'."\n";
    }
    if(isset($_GET['wordCase'])){
        echo 'tmp["wordCase"] = "'.$_GET['wordCase'].'";'."\n";
    }
    if(isset($_GET['wordDictionary'])){
        echo 'tmp["wordDictionary"] = "'.$_GET['wordDictionary'].'";'."\n";
    }
    if(isset($_GET['wordSize'])){
        echo 'tmp["wordSize"] = "'.$_GET['wordSize'].'";'."\n";
    }
    if(isset($_GET['specialCharacters'])){
        echo 'tmp["specialCharacters"] = "'.$_GET['specialCharacters'].'";'."\n";
    }
    if(isset($_GET['customWord'])){
        echo 'tmp["customWord"] = "'.$_GET['customWord'].'";'."\n";
    }
    if(isset($_GET['passwordCount'])){
        echo 'tmp["passwordCount"] = "'.$_GET['passwordCount'].'";'."\n";
    }
?>
console.log(tmp);
document.write(APIRequest(tmp["passStyle"], tmp["passwordCount"], tmp["wordCase"], tmp["wordDictionary"], tmp["wordSize"], tmp["specialCharacters"], tmp["customWord"]));
</script>