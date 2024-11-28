console.log('ciao');
const prompt = require('prompt-sync')();
var parola = prompt('inserire parola: ');

var vocali = "aeiou"
countVocali = 0
countCons = 0

for(i in parola){
    for(v in vocali){
        console.log(i + " " + v)
        if(parola[i]==vocali[v]){
            countVocali++;
            break;
        }
        else if(vocali[v] == 'u')
            countCons++;
    }
}

console.log("Vocali: " + countVocali, " - Consonanti: " + countCons)