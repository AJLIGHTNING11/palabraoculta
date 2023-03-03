Swal.fire
({
  title: '<strong>Instrucciones</strong>',
  icon: 'info',
  html:
    'Deberás ordenar la <b>Palabra oculta</b> correctamente, el juego tiene un límite de tiempo, por lo cual sino lo lograste pasará a otra palabra; cuentas con una <b>Pista</b> para solucionarlo' ,
    showCloseButton: true,
})

const wordText = document.querySelector('.word'),
hintText = document.querySelector('.hint span'),
timeText = document.querySelector('.time b'),
inputField = document.querySelector('input'),
refreshBtn = document.querySelector('.refresh-word'),
checkBtn = document.querySelector('.check-word');
let correctWord,
timer;
const initTimer = maxTime=>{
  clearInterval(timer);
  timer = setInterval(() =>{
    if (maxTime > 0) {
      maxTime--;
      return timeText.innerText = maxTime;
    }
    Swal.fire(`"Tiempo excedido"`);
    initGame();
  }, 1000);
}




const initGame = () =>{
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split('');
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [
      wordArray[i],
      wordArray[j]
    ] = [
      wordArray[j],
      wordArray[i]
    ];
  }
  wordText.innerText = wordArray.join('');
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  ;
  inputField.value = '';
  inputField.setAttribute('maxlength', correctWord.length);
}
initGame();
const checkWord = () =>{
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return swal("Ingrese una palabra");
  //if (!userWord) return alert('Ingrese una palabra');
  if (userWord !== correctWord) return Swal.fire("Ups!", "palabra incorrecta", "error");
  //alert(`Ups! ${ userWord } palabra incorrecta`);
  Swal.fire(`"Bien hecho!", "${ correctWord.toLowerCase() }"` ,"es la palabra correcta", "success");
  //alert(`Bien hecho! ${ correctWord.tolowerCase()} es la palabra correcta`);
  initGame();
}
refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);

