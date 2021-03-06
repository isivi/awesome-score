
export default class CodeAnimation {
  totalAnimationTime = 2400;
  intervalsCounter = 0;
  interval = 50;
  intervalID = null;
  code = null;
  updateCodeCallback = null;

  constructor(updateCodeCallback, { successCode, finalCode }) {
    this.updateCodeCallback = updateCodeCallback;
    this.code = { success: successCode, final: finalCode };
  }

  start() {
    this.intervalID = setInterval(this.tick.bind(this), this.interval);
    return new Promise(this.promiseExecutor.bind(this));
  }

  tick() {
    this.intervalsCounter++;
    const elapsedTime = this.intervalsCounter * this.interval;
    const border = this.code.final.length * elapsedTime / this.totalAnimationTime;

    if (elapsedTime >= this.totalAnimationTime) {
      this.stop();
    } else {
      this.updateCodeCallback(
        this.code.final.substr(0, border) + this.code.success.substr(border)
      );
    }
  }

  stop() {
    this.updateCodeCallback(this.code.final);
    clearInterval(this.intervalID);
    this.promise.resolve();
  }

  promiseExecutor(resolve, reject) {
    this.promise = { resolve, reject };
  }
}
