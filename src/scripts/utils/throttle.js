function throttle(cb, delay) {
  let isThrottled = false;
  let waitingArgs;

  const timeoutFunc = () => {
    if(waitingArgs == null) {
      isThrottled = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if(isThrottled) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    isThrottled = true;

    setTimeout(timeoutFunc, delay)
  }
}

export default throttle;
