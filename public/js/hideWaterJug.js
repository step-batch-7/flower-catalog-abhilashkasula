const hide = function() {
  const jug = document.querySelector('#can');
  const milliSeconds = 1000;
  jug.style['opacity'] = '0%';
  const setOpacityToHigh = () => {
    jug.style['opacity'] = '100%';
  };
  setTimeout(setOpacityToHigh, milliSeconds);
};
