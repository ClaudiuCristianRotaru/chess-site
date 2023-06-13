/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  
});

let inter = setInterval(doTime,100);

function doTime() {
  postMessage("");
}