//toolbar
var overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.fontFamily = 'Verdana';
overlay.style.bottom = '10%';
overlay.style.display = 'inline';
overlay.style.left = '25px';
overlay.style.height = '200px';
overlay.style.width = '200px';
overlay.style.zIndex = 9999;
overlay.style.backgroundColor = '#ffffff5c';
overlay.style.border = '1px solid gray';
overlay.style.backdropFilter = 'blur(1px)';
overlay.style.padding = '10px';
overlay.style.textAlign = 'center';
overlay.innerHTML = 'Welcome, here are the available options:<br><button onclick="randomAnswer()">Answer randomly</button>';

document.body.appendChild(overlay);

var console = document.createElement('div');
console.style.overflowY = 'scroll';
console.style.width = '400px';
console.style.height = '200px';
console.style.opacity = '0.5';
console.style.zIndex = 9999;
console.style.backgroundColor = 'white';
console.style.border = '1px gray solid';
console.style.position = 'fixed';
console.style.fontFamily = 'Consolas';
console.style.bottom = '10%';
console.style.display = 'inline';
console.style.right = '25px';
console.id = 'anyans-console';
console.innerHTML = 'Anyans loaded.<br>';

document.body.appendChild(console);

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function outputToConsole(message) {
  var anyans_console = document.getElementById('anyans-console');
  anyans_console.innerHTML = message + '<br>' + anyans_console.innerHTML;
  console.log(message);
}

function randomAnswer() {
  outputToConsole('Started randomAnswer')
  if(window.location.href.includes('surveymyopinion.researchnow.com')) {
    var i = 0;
    document.querySelectorAll('.answers').forEach(function(question) {
      outputToConsole('Found one question');
      var i2 = 0;
      question.querySelectorAll('input').forEach(function(child) {
        if(child.tagName.toLowerCase() == 'input') {
          if(child.parentElement.lastElementChild.innerHTML.toLowerCase().includes('aucun')) {
            if(Math.floor(Math.random() * 10) < 1) {
              i2++;
              child.click();
            }
          }
          else if(Math.floor(Math.random() * 10) < 4) {
            i2++;
            child.click();
          }
        }
      })
      if(i2 == 1) {
        child.click();

      }
      outputToConsole('Answer(s) clicked');
      i++;
    })
    if(i == 0) {
      outputToConsole('Found 0 questions');
    }
    else {
      outputToConsole('Submitting...');
      document.querySelectorAll('button').forEach(function(btn) {
        if(btn.type == 'submit') {
          btn.click();
        }
      });
    }
  }
  //else if(window.location.href.includes('tolunastart.com')) {
    // $('.choiceQuestion').each(function(question) {
    //   console.log('Found question');
    //   var child;
    //   for(var i=0, len = question.childElementCount ; i < len; ++i){
    //     child = question.childNodes[i];
    //     console.log('Found question');
    //   }
    // });
  else {
    outputToConsole(window.location.href + ' is not a supported website.');
  }
}
