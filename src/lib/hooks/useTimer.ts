import { useEffect, useRef, useState } from 'react';
import { TIMER_CONSTANT } from '../constanst/timerContants';
import { resolveTimeParts } from '../helpers/resolveTimeParts';
import { TimerInterface } from '../interfaces/timer.interface';

export const useTimer = () => {
  const [timer, setTimer] = useState<TimerInterface>({
    initialTimer: 2,
    pausedTime: 0,
    minutes: '00',
    seconds: '00',
    grades: 0,
  });
  const setInitialTimer = (newInitialTimer: number) =>
    setTimer({ ...timer, initialTimer: newInitialTimer });

  const timerRef = useRef<number | null>(null);

  const [play, setPlay] = useState(false);

  const { initialTimer, pausedTime } = timer;

  const handlePlay = () => {
    setPlay(!play);
  };

  useEffect(() => {
    let interval: number;
    if (play) {
      // totalTime in ms
      let totalTime = timerRef.current ? timerRef.current : initialTimer * 60 * 1000;
      // totalTime in seg
      const totalTimeSeconds = initialTimer * 60;

      interval = setInterval(() => {
        totalTime -= TIMER_CONSTANT.SECOND;

        const { grades, minutes, seconds } = resolveTimeParts(totalTime, totalTimeSeconds);

        setTimer((prevSets) => ({
          ...prevSets,
          minutes,
          seconds,
          grades,
        }));

        timerRef.current = totalTime;
      }, TIMER_CONSTANT.SECOND);
    }
    return () => clearInterval(interval);
  }, [initialTimer, play, pausedTime]);

  return { ...timer, play, handlePlay, setInitialTimer };
};
