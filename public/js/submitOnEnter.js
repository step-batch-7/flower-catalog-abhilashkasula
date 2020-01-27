const submitOnEnter = function(event) {
  const button = document.querySelector('#submit');
  if(event.keyCode === 13) {
    button.click();
  }
}