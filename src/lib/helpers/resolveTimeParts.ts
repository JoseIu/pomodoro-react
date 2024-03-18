import { TIMER_CONSTANT } from '../constanst/timerContants';

export const resolveTimeParts = (totalTime: number, totalTimeSeconds: number) => {
  const currentTime = totalTime / 1000;

  const minutes = formatTime(totalTime / TIMER_CONSTANT.MINUTE);
  const seconds = formatTime((totalTime % TIMER_CONSTANT.MINUTE) / TIMER_CONSTANT.SECOND);
  const grades =
    ((totalTimeSeconds - currentTime) * TIMER_CONSTANT.TOTAL_GRADES) / totalTimeSeconds;

  return {
    minutes,
    seconds,
    grades,
  };
};

export const formatTime = (time: number) => {
  return Math.floor(time).toString().padStart(2, '0');
};
