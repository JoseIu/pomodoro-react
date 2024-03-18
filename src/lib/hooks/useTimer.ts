import { useEffect, useRef, useState } from 'react';
import { TIMER_CONSTANT } from '../constanst/timerContants';
import { resolveTimeParts } from '../helpers/resolveTimeParts';
import { TimerInterface } from '../interfaces/timer.interface';

export const useTimer = () => {
  const [timer, setTimer] = useState<TimerInterface>({
    workTime: 1,
    bWorkTime: 1,

    breakTime: 2,
    bBreakTime: 2,

    minutes: '00',
    seconds: '00',
    grades: 0,

    work: true,
    break: false,
  });
  const { workTime: workTime, work, breakTime } = timer;
  const setInitialTimer = (newInitialTimer: number) =>
    setTimer({ ...timer, workTime: newInitialTimer });

  const timerRef = useRef<number | null>(null);
  const numref = useRef<number>(breakTime);

  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    setPlay(!play);
  };

  useEffect(() => {
    // let interval: number;
    if (!play) return;
    // totalTime in ms
    let totalTime = timerRef.current ? timerRef.current : workTime * 60 * 1000;
    const totalTimeSeconds = workTime * 60;
    // totalTime in seg

    const interval = setInterval(() => {
      totalTime -= TIMER_CONSTANT.SECOND;

      if (totalTime === 0) {
        clearInterval(interval);
        if (work) {
          setTimer((prev) => ({ ...prev, work: !work, workTime: prev.breakTime }));
        } else {
          setTimer((prev) => ({ ...prev, work: !work, workTime: prev.bWorkTime }));
        }
        // setTimer((prev) => ({ ...prev, work: true, workTime: prev.bWorkTime }));
      }

      const { grades, minutes, seconds } = resolveTimeParts(totalTime, totalTimeSeconds);

      setTimer((prevSets) => ({
        ...prevSets,
        minutes,
        seconds,
        grades,
      }));

      timerRef.current = totalTime;
    }, 50);

    return () => clearInterval(interval);
  }, [workTime, play, work]);

  return { ...timer, play, handlePlay, setInitialTimer };
};
