const button = document.querySelector('.welcome__btn');
const body = document.querySelector('body');

button.addEventListener('click', () => {
  if(button.innerHTML == 'Stop'){
    body.style.animationName = 'stop';
    button.innerHTML = "Play";
  }else {
    body.style.animationName = 'play';
    button.innerHTML = "Stop";
  }
});
