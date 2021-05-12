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
overlay.id = 'anyans-overlay';
overlay.innerHTML = 'Welcome, here are the available options:<br><button onclick="randomAnswer()">Answer randomly</button><br><button onclick="easyAnswer()">Answer simple question</button>';

document.body.appendChild(overlay);

var console = document.createElement('div');
console.style.overflowY = 'scroll';
console.style.width = '400px';
console.style.height = '200px';
console.style.zIndex = 9999;
console.style.backgroundColor = '#ffffff5c';
console.style.border = '1px solid gray';
console.style.backdropFilter = 'blur(1px)';
console.style.position = 'fixed';
console.style.fontFamily = 'Consolas';
console.style.bottom = '10%';
console.style.display = 'inline';
console.style.right = '25px';
console.id = 'anyans-console';
console.style.pointerEvents = 'none';
console.innerHTML = 'Anyans loaded.<br>';

document.body.appendChild(console);

var injectedReminder = document.createElement('span');
injectedReminder.style.position = 'fixed';
injectedReminder.style.bottom = '10px';
injectedReminder.style.left = '10px';
injectedReminder.style.fontFamily = 'Verdana';
injectedReminder.style.fontStyle = 'italic';
injectedReminder.style.color = 'black';
injectedReminder.style.display = 'none';
injectedReminder.id = 'anyans-reminder';
injectedReminder.innerHTML = 'Anyans is still injected';

var script = document.createElement('script');
////////////////////////////////
script.innerHTML = `

function outputToConsole(message) {
  var anyans_console = document.getElementById('anyans-console');
  if(message == 'This website is not fully supported') {
    anyans_console.innerHTML = '<span style="color: orange">' + message + '</span><br>' + anyans_console.innerHTML;
  } else if(message == 'This website is fully supported') {
    anyans_console.innerHTML = '<span style="color: green">' + message + '</span><br>' + anyans_console.innerHTML;
  } else {
    anyans_console.innerHTML = message + '<br>' + anyans_console.innerHTML;
  }
  console.log(message);
}

function randomAnswer() {
  var canContinue = false;
  outputToConsole('Started randomAnswer')
  if(window.location.href.includes('surveymyopinion.researchnow.com')) {
    document.querySelectorAll('.answers').forEach(function(question) {
      outputToConsole('Found one question');
      var i = 0;
      question.querySelectorAll('input').forEach(function(child) {
        if(child.tagName.toLowerCase() == 'input') {
          if(child.parentElement.lastElementChild.innerHTML.toLowerCase().includes('aucun')) {
            if(Math.floor(Math.random() * 10) < 1 || i == 0) {
              i++;
              child.click();
              canContinue = true;
            }
          }
          else if(Math.floor(Math.random() * 10) < 4) {
            i++;
            child.click();
            canContinue = true;
          }
        }
      })

      document.querySelectorAll('select').forEach(function(select) {
        var optionCount = 0;
        select.querySelectorAll('option').forEach(function(option) {
          optionCount++;
          option.selected = false;
        });
        var rdmOption = optionCount - 2 - Math.floor(Math.random() * optionCount - 1);
        if(rdmOption == optionCount - 1) rdmOption--;
        if(rdmOption == 0) rdmOption++;
        select.querySelectorAll('option')[rdmOption].selected = 'selected';
        canContinue = true; //NOT WORKING, NEED FIXING
        select.setAttribute('class', 'form-control ng-valid ng-touched ng-not-empty ng-dirty ng-valid-parse'); //for some reason className doesnt work 
      });
      outputToConsole('Answer(s) clicked');
    });

    if(canContinue == false) outputToConsole('Found 0 questions');
    else {
      outputToConsole('Submitting...');
      document.querySelectorAll('button').forEach(function(btn) {
        if(btn.type == 'submit') {
          btn.click();
        }
      });
    }
  }
  else if(window.location.href.includes('opinionbar.com')) {
    document.querySelectorAll('.answer_options').forEach(function(answer) {
      outputToConsole('Found one question');
      var i2 = 0;
      answer.querySelectorAll('div').forEach(function(child) {
        if(Math.floor(Math.random() * 10) < 4) {
          i2++;
          child.click();
        }
      })
      outputToConsole('Answer(s) clicked');
      i++;
    })
    outputToConsole('Submitting...');
    document.getElementById('next').click();
  }
  else if(window.location.href.includes('selfserve.decipherinc.com') || window.location.href.includes('https://survey.researchresults.com/')) {
    document.querySelectorAll('.question').forEach(function(question) {
      question.querySelectorAll('input').forEach(function(child) {
        if(Math.floor(Math.random() * 10) < 4) {
          child.click();
        }
      })
    });
    outputToConsole('Answer(s) clicked, submitting...');
    document.getElementById('btn_continue').click();
  }
  else if(window.location.href.includes('https://mcg.decipherinc.com/')) {
    document.querySelectorAll('.question').forEach(function(question) {
      question.querySelectorAll('input').forEach(function(child) {
        if(Math.floor(Math.random() * 10) < 4) {
          child.click();
        }
      })
    });
    document.querySelectorAll('option').forEach(function(option) {
      if(Math.floor(Math.random() * 10) < 4) {
        document.querySelectorAll('option').forEach(function(option2) {
          option2.selected = false;
        });
        option.selected = 'selected';
      }
    });
    outputToConsole('Answer(s) clicked, submitting...');
    document.getElementById('btn_continue').click();
  }
  else if(window.location.href.includes('https://survey.cmix.com/')) {
    var canContinue = false;
    document.querySelectorAll('.cm-response-group ').forEach(function(question) {
      canContinue = true;
      outputToConsole('Found one question');
      question.querySelectorAll('.cm-checkbox-input').forEach(function(cb) {
        if(Math.floor(Math.random() * 10) < 4) {
          cb.click();
        }
      });
      question.querySelectorAll('.cm-radio-input').forEach(function(cb) {
        if(Math.floor(Math.random() * 10) < 4) {
          cb.click();
        }
      });
    });
    document.querySelectorAll('.cm-grid-response-set').forEach(function(question) {
      canContinue = true;
      outputToConsole('Found one question');
      question.querySelectorAll('tr').forEach(function(tr) {
        var i = 0;
        tr.querySelectorAll('.cm-grid-input').forEach(function(cb) {
          if(Math.floor(Math.random() * 10) < 4 || i == 0) {
            cb.click();
          }
          i++;
        });
      });
    });
    document.querySelectorAll('.cm-simple-grid ').forEach(function(question) {
      canContinue = true;
      outputToConsole('Found one question');
      question.querySelectorAll('tr').forEach(function(tr) {
        var i = 0;
        tr.querySelectorAll('.cm-radio-input').forEach(function(cb) {
          if(Math.floor(Math.random() * 10) < 4 || i == 0) {
            cb.click();
          }
          i++;
        });
      });
    });
    if(canContinue) document.getElementById('cm-NextButton').click();
  }
  else if(window.location.href.includes('https://project.tolunastart.com/')) {
    document.querySelectorAll('.choiceNormalTable').forEach(function(question) {
      outputToConsole('Found one question');
      question.querySelectorAll('.answerText').forEach(function(child) {
        if(Math.floor(Math.random() * 10) < 4) {
          child.click();
        }
      })
    });
    outputToConsole('Answer(s) clicked, submitting...');
    document.querySelectorAll('button').forEach(function(btn) {
      if(btn.getAttribute('ng-if') == 'showNextButton') {
        btn.click();
      }
    });
  }
  else if(window.location.href.includes('https://survey-d.dynata.com/')) {
    var canContinue = false;
    document.querySelectorAll('select').forEach(function(select) {
      outputToConsole('Found one question');
      var i = 0;
      select.querySelectorAll('option').forEach(function(option) {
        if(Math.floor(Math.random() * 10) < 4 || i == 0) {
          select.querySelectorAll('option').forEach(function(option2) {
            option2.selected = false;
          });
          option.selected = true;
          canContinue = true;
          i++;
        }
      });
    });
    document.querySelectorAll('.answers-list').forEach(function(question) {
      outputToConsole('Found one question');
      var i = 0;
      question.querySelectorAll('label').forEach(function(option) {
        if(Math.floor(Math.random() * 10) < 4 || i == 0) {
          option.click();
          canContinue = true;
          i++;
        }
      });
    });
    if(canContinue) {
      outputToConsole('Answer(s) clicked, submitting...');
      document.getElementById('btn_continue').click();
    }
  }
  else {
    outputToConsole(window.location.href + ' is not a supported website, trying to answer...');
    document.querySelectorAll('.question').forEach(function(question) {
      question.querySelectorAll('input').forEach(function(child) {
        if(Math.floor(Math.random() * 10) < 4) {
          child.click();
        }
      })
    });
    outputToConsole('Tried to click answer(s)');
  }
}

function easyAnswer() {
  outputToConsole('Started easyAnswer')
  if(window.location.href.includes('opinionbar.com')) {
    if(document.querySelector('.radio_q_text').innerHTML.includes('A quel genre vous identifiez-vous ?')) {
      document.querySelectorAll('.answer_options8000').forEach(function(radio) {
        if(radio.innerHTML.includes('Homme')) {
          radio.querySelector('.option_radio').click();
          document.querySelector('select').querySelectorAll('option').forEach(function(option) {
            if(option.innerHTML == '30 ans') {
              option.selected = 'selected';
            }
          });
          outputToConsole('Submitting...');
          document.getElementById('next').className = 'next arrow_on'; 
          setTimeout(function() {
            document.getElementById('next').click();
          }, 100);
          
        }
      });
    }
  }
  else {
    outputToConsole('No easy answer detected.');
  }
}

`;

document.getElementsByTagName('head')[0].appendChild(script);

if(window.location.href.includes('collectskins.com')) {
  document.getElementById('anyans-console').style.display = 'none';
  document.getElementById('anyans-overlay').style.display = 'none';
  injectedReminder.style.display = 'block';
} 
else if(window.location.href.includes('opinionbar.com')) {
  outputToConsole('This website is supported');
}
else if(window.location.href.includes('selfserve.decipherinc.com')) {
  outputToConsole('This website is supported');
  if(document.querySelector('.comment-text') !== null) {
    outputToConsole('Skipping...');
    document.getElementById('btn_continue').click();
  }
}
else if(window.location.href.includes('surveymyopinion.researchnow.com')) {
  outputToConsole('This website is not fully supported');
}
else if(window.location.href.includes('https://router.cint.com/')) {
  outputToConsole('This website is not fully supported');
  if(document.querySelector('.lead').innerHTML == 'D\'après votre profile, vous correspondez à l\'enquête') {
    outputToConsole('Skipping...');
    document.getElementById('invite-link').click();
  }
}
else if(window.location.href.includes('https://redirect.imadconnect.com/')) {
  outputToConsole('This website is not fully supported');
  if(document.getElementById('btnSartSurvey') !== null) {
    document.getElementById('btnSartSurvey').click();
  }
}
else if(window.location.href.includes('https://survey.researchresults.com/')) {
  outputToConsole('This website is not fully supported');
  if(document.querySelector('.comment-text') !== null) {
    document.getElementById('btn_continue').click();
    outputToConsole('Skipping...');
  } else if(document.getElementById('question_text_S1').innerHTML.includes('Quel âge avez-vous')) {
    document.querySelectorAll('li').forEach(function(question) {
      if(question.getAttribute('data-uid') == '293') {
        question.click();
        document.getElementById('btn_continue').click();
        outputToConsole('Skipping...');
      }
    })
  }
}
else if(window.location.href.includes('https://mcg.decipherinc.com/')) {
  outputToConsole('This website is not fully supported');
  if(document.querySelector('.comment-text') !== null) {
    document.getElementById('btn_continue').click();
    outputToConsole('Skipping...');
  } else if(document.getElementById('question_text_TerrCheck') !== null) {
    document.querySelectorAll('label').forEach(function(question) {
      if(question.innerHTML == 'France') {
        question.click();
        document.getElementById('btn_continue').click();
        outputToConsole('Skipping...');
      }
    })
  }
  if(document.getElementById('question_age') !== null) {
    document.getElementById('question_age').querySelector('input').value = '30';
  }
  if(document.getElementById('question_gender') !== null) {
    document.getElementById('question_gender').querySelectorAll('label').forEach(function(answer) {
      if(answer.innerHTML.toLowerCase().includes('homme')) {
        answer.click();
      }
    });
  }
}
else if(window.location.href.includes('https://survey.cmix.com/')) {
  outputToConsole('This website is fully supported');
}
else if(window.location.href.includes('https://survey-d.dynata.com/')) {
  outputToConsole('This website is not fully supported');
  if(document.querySelector('.comment-text') !== null) {
    outputToConsole('Skipping...');
    document.getElementById('btn_continue').click();
  }
  if(document.getElementById('question_text_F1') !== null && document.getElementById('question_text_F1').innerHTML == 'Quel âge avez-vous ?') {
    document.querySelectorAll('input').forEach(function(input) {
      if(input.className.toLowerCase().includes('text-input')) {
        input.value = '30';
        outputToConsole('Skipping...');
        document.getElementById('btn_continue').click();
      }
    });
  }
  if(document.getElementById('question_text_F2') !== null && document.getElementById('question_text_F2').innerHTML == 'Vous êtes…') {
    document.querySelectorAll('label').forEach(function(label) {
      if(label.innerHTML == 'Un homme') {
        label.click();
        outputToConsole('Skipping...');
        document.getElementById('btn_continue').click();
      }
    });
  }
  if(document.getElementById('question_text_F3') !== null && document.getElementById('question_text_F3').innerHTML == 'Quel est votre code postal ? ') {
    document.querySelectorAll('input').forEach(function(input) {
      if(input.className.toLowerCase().includes('text-input')) {
        input.value = '35000';
        outputToConsole('Skipping...');
        document.getElementById('btn_continue').click();
      }
    });
  }
}
else if(window.location.href.includes('https://dkr1.ssisurveys.com/')) {
  outputToConsole('This website is not fully supported');
  if(document.getElementById('takesurveybtn') !== null) {
    document.getElementById('takesurveybtn').click();
    outputToConsole('Skipping...');
  }
  if(document.getElementById('header').innerHTML == '\nAimeriez-vous faire entendre votre opinion?') {
    if(document.getElementById('identityConfirmation') !== null) {
      if(document.getElementById('identityConfirmation').querySelector('.questionFont').innerHTML.includes('Date de naissance:')) {
        document.getElementById('birthDay').querySelectorAll('option')[3].selected = 'selected';
        document.getElementById('birthMonth').querySelectorAll('option')[3].selected = 'selected';
        document.getElementById('birthYear').querySelectorAll('option').forEach(function(answer) {
          if(answer.innerHTML == '1990') {
            answer.selected = 'selected';
          }
        });
        document.getElementById('next').click();
        outputToConsole('Skipping...');
      }
    }
  }
}
else if(window.location.href.includes('https://s.cint.com/') || window.location.href.includes('https://www.ptrack1.com/')) {
  outputToConsole('This website is known');
  if(document.getElementById('toggle-all') !== null) {
    document.getElementById('toggle-all').click();
    document.querySelectorAll('input').forEach(function(btn) {
      if(btn.type == 'submit') {
        outputToConsole('Skipping...');
        btn.click();
      }
    });
  }
}
else if(window.location.href.includes('https://edgesurvey.innovatemr.net/')) {
  outputToConsole('This website is not fully supported');
  document.querySelectorAll('button').forEach(function(btn) {
    if(btn.innerHTML == 'Let\'s Do This') {
      btn.click();
    }
  });
}
else if(window.location.href.includes('https://ys.cint.com/') || window.location.href.includes('https://www.ptrack1.com/')) {
  outputToConsole('This website is known');
}
else if(window.location.href.includes('https://offers.cpx-research.com/')) {
  outputToConsole('This website is known');
}
else {
  outputToConsole('This website is probably not supported');
}

document.body.appendChild(injectedReminder);