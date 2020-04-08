// I should refactor this later...

const clock = new DigitalClock();
clock.set();

function setTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const seconds = now.getSeconds();

  clock.setTime(hour, minute, seconds);

  setTimeout(setTime, 1000);
}

setTime();
