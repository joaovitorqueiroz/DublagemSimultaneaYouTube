var synth = window.speechSynthesis;
var url = window.location.href;
var rateValue=1.3;
let pitchValue= 0.8;

let lastLegend='';


function listenEventChangeLegend(){
   let legenda = document.getElementsByClassName("ytp-caption-segment");
   if(legenda[0]){
       if(lastLegend!=legenda[0].textContent){
           lastLegend=legenda[0].textContent
           console.log(lastLegend);
           speak(lastLegend)
       }
   }  
    setTimeout(function(){listenEventChangeLegend()}, 200);
}

function resumeInfinity() {
    window.speechSynthesis.resume();
    timeoutResumeInfinity = setTimeout(resumeInfinity, 1000);
}

resumeInfinity();// resolve o bug que para speak apos um tempo
listenEventChangeLegend();

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

document.addEventListener('keydown', logKey);

function logKey(e) {
   if(e.code==="KeyA"){
       if(rateValue<2){
        rateValue=rateValue+0.1;
        console.log(rateValue);
       }       
   }
   if(e.code==="KeyS"){
    if(rateValue>0.5){
        rateValue=rateValue-0.1;
        console.log(rateValue);
       }
   }

   if(e.code==="KeyQ"){
    if(pitchValue<2){
        pitchValue=pitchValue+0.1;
     console.log(pitchValue);
    }       
    }
    if(e.code==="KeyW"){
    if(pitchValue>0.5){
        pitchValue=pitchValue-0.1;
        console.log(pitchValue);
        }
    }

}

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  console.log(synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    if ( aname < bname ) return -1;
    else if ( aname == bname ) return 0;
    else return +1;
}))
}

let bufferSpeak=''

function speakBuffer(){
    if(bufferSpeak!=''){
        speak(bufferSpeak);
        bufferSpeak='';
    }
    else
    return
}

function speak(text){
   /*  if (synth.speaking) {
        bufferSpeak=text;
        console.log('speechSynthesis.speaking');
        return;
    } */
    if (text !== '') {
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
        speakBuffer();
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    if(voices!== undefined)
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === "Google português do Brasil") {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitchValue;
    utterThis.rate = rateValue;
    synth.speak(utterThis);
  }
}