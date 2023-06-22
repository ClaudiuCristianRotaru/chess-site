/// <reference lib="webworker" />

let inter = setInterval(ping,100);

function ping() {
  postMessage("");
}


