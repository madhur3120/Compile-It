var mainContainer = document.createElement("div");
document.body.appendChild(mainContainer);

var codeArea = document.createElement("textarea");
codeArea.setAttribute("placeholder","Write your code");
codeArea.rows = "25";
codeArea.cols = "40";
mainContainer.appendChild(codeArea);

mainContainer.appendChild(document.createElement("br"));
mainContainer.appendChild(document.createElement("br"));

var languages = ["Python","Javascript","C","CPP","JAVA"];

var languageSelect = document.createElement("select");
mainContainer.appendChild(languageSelect);

languages.forEach(function(language){
  var option = document.createElement("option");
  if(language == "Python"){
    option.value = "0";
  }
  if(language == "Javascript"){
    option.value = "4";
  }
  if(language == "C"){
    option.value = "7";
  }
  if(language == "CPP"){
    option.value = "77";
  }
  if(language == "JAVA"){
    option.value = "8";
  }
  option.text = language;
  languageSelect.appendChild(option);
})

var submit = document.createElement("button");
submit.innerHTML = "Submit"
mainContainer.appendChild(submit);

mainContainer.appendChild(document.createElement("br"));
mainContainer.appendChild(document.createElement("br"));

var outputArea = document.createElement("textarea");
outputArea.setAttribute("placeholder","Your output");
outputArea.rows = "10";
outputArea.cols = "40";
outputArea.style.color = "white";
outputArea.style.backgroundColor = "black";
outputArea.readOnly = true;
mainContainer.appendChild(outputArea);

submit.addEventListener("click",function(event){
  var request = new XMLHttpRequest();
  var code = codeArea.value;
  var lang = languageSelect.value;
  
  request.open("POST","https://codequotient.com/api/executeCode");
  request.setRequestHeader("content-type","application/json");

  request.send(JSON.stringify({
      code:`${code}`,
      langId:lang
    }));

  request.addEventListener("load", function(event){
      var data = JSON.parse(event.target.responseText);
      if(data !== null)
      {
        var value = data.codeId;
        var myInterval = setInterval(function(){
        var request = new XMLHttpRequest();
        request.open("GET", `https://codequotient.com/api/codeResult/${value}`);
        request.send();
        request.addEventListener("load",function(e){
          var op = JSON.parse(e.target.responseText);
          op = JSON.parse(op.data);
          if(op.errors === "")
          {
            op.output = op.output.substr(1,op.output.length-2);
            outputArea.innerHTML = op.output;
          }
          else{
            outputArea.innerHTML = op.errors;
          }
          clearInterval(myInterval);
        });
      },6000);
    }
  });
})