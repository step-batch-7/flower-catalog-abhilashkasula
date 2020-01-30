const hide = function() {
  const jug = document.querySelector('#can');
  const milliSeconds = 1000;
  jug.style['visibility'] = 'hidden';
  const setOpacityToHigh = () => {
    jug.style['visibility'] = 'visible';
  };
  setTimeout(setOpacityToHigh, milliSeconds);
};
