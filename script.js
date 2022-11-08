const inpHrs = document.querySelector("#inp-hrs");
const inpMin = document.querySelector("#inp-min");
const inpSec = document.querySelector("#inp-sec");
const btnTrigger = document.querySelector("#btn-trigger");
const btnReset = document.querySelector("#btn-reset");

class Timer {
  constructor() {
    this.hrs = 0;
    this.min = 0;
    this.sec = 0;
    this.interval = null;
  }

  start(hrs, min, sec) {
    this.hrs = hrs;
    this.min = min;
    this.sec = sec;

    // 1분 30초면 90초
    // 90 - 30 === 0이 되면? min -1

    // 2분 20초면 = 140초
    // 140 - 20 === 0이 되면? min - 1
    // 140 - 120 === 0이 되면? min - 1

    this.interval = setInterval(() => {
      if (this.hrs === 0 && this.min === 0 && this.sec === 0) {
        this.pause();
        this.reset();
        btnTrigger.setAttribute("class", "btn-disabled");
        btnReset.setAttribute("class", "btn-disabled");
        alert("타이머 종료!");
      } else {
        if (this.sec > 0) {
          this.sec--;
        } else if (this.sec === 0 && (this.min > 0 || this.hrs > 0)) {
          this.sec = 59;

          if (this.min > 0) {
            this.min--;
          } else if (this.min === 0 && this.hrs > 0) {
            this.min = 59;

            if (this.hrs > 0) {
              this.hrs--;
              inpHrs.value = this.hrs;
            }
          }

          inpMin.value = this.min;
        }

        inpSec.value = this.sec;
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.interval);
  }

  reset() {
    this.hrs = 0;
    this.min = 0;
    this.sec = 0;
    this.interval = null;
  }
}

const myTimer = new Timer();
let triggerState = "start";

btnTrigger.addEventListener("click", (e) => {
  e.preventDefault();

  if (triggerState === "start") {
    const inpHrsVal = inpHrs.value.length === 0 ? 0 : parseInt(inpHrs.value);
    const inpMinVal = inpMin.value.length === 0 ? 0 : parseInt(inpMin.value);
    const inpSecVal = inpSec.value.length === 0 ? 0 : parseInt(inpSec.value);

    myTimer.start(inpHrsVal, inpMinVal, inpSecVal);

    btnTrigger.innerText = "PAUSE";
    btnTrigger.setAttribute("class", "btn-active pause fs-md fw-bold");
    triggerState = "pause";
  } else if (triggerState === "pause") {
    myTimer.pause();

    btnTrigger.innerText = "START";
    triggerState = "start";
    btnTrigger.setAttribute("class", "btn-active start fs-md fw-bold");
  }
});

btnReset.addEventListener("click", (e) => {
  myTimer.reset();
});

inpHrs.addEventListener("keydown", (e) => {
  if (
    btnTrigger.classList.contains("btn-disabled") &&
    btnReset.classList.contains("btn-disabled")
  ) {
    btnTrigger.setAttribute("class", "btn-active pause fs-md fw-bold");
    btnReset.setAttribute("class", "btn-active reset fs-md fw-bold");
    triggerState = "start";
  }
});

inpMin.addEventListener("keydown", (e) => {
  if (
    btnTrigger.classList.contains("btn-disabled") &&
    btnReset.classList.contains("btn-disabled")
  ) {
    btnTrigger.setAttribute("class", "btn-active pause fs-md fw-bold");
    btnReset.setAttribute("class", "btn-active reset fs-md fw-bold");
    triggerState = "start";
  }
});

inpSec.addEventListener("keydown", (e) => {
  if (
    btnTrigger.classList.contains("btn-disabled") &&
    btnReset.classList.contains("btn-disabled")
  ) {
    btnTrigger.setAttribute("class", "btn-active pause fs-md fw-bold");
    btnReset.setAttribute("class", "btn-active reset fs-md fw-bold");
    triggerState = "start";
  }
});
