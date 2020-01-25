hide = function() {
  jug = document.querySelector('#can');
  jug.style['opacity'] ='0%';
  setTimeout(() => jug.style['opacity']='100%',1000);
}