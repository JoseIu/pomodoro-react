import { useEffect, useRef, useState } from 'react';
import style from './Clock.module.scss';
const SECOND = 1000;
const MINUTE = SECOND * 60; //60.000 ms
const HOUR = MINUTE * 60; //  3.600.000 ms

const Clock = () => {
  const [timer, setTimer] = useState({
    initialTimer: 2,
    pausedTime: 0,
    minutes: '00',
    seconds: '00',
  });

  const [porcet, setPortcent] = useState({
    totalPorcent: 0,
    actualPorcent: 0,
    grados: 0,
  });

  const [play, setPlay] = useState(false);

  const { grados } = porcet;

  const { minutes, seconds, pausedTime } = timer;

  const timerRef = useRef<number | null>(null);

  const handlePlay = () => {
    setPlay(!play);
  };

  useEffect(() => {
    let interval: number;
    if (play) {
      let diff = timerRef.current ? timerRef.current : timer.initialTimer * 60 * 1000;
      const diffInSeconds = timer.initialTimer * 60;

      interval = setInterval(() => {
        diff -= SECOND;

        const diffToSecond2 = diff / 1000;

        const grades = ((diffInSeconds - diffToSecond2) * 360) / diffInSeconds;

        const minutes = formatTime(diff / MINUTE);
        const seconds = formatTime((diff % MINUTE) / SECOND);

        setTimer((prevTimer) => ({
          ...prevTimer,
          minutes: minutes,
          seconds: seconds,
        }));
        setPortcent((prevSets) => ({
          ...prevSets,
          totalPorcent: (1 / 2) * 100,
          actualPorcent: prevSets.totalPorcent - 100,
          grados: grades,
        }));

        timerRef.current = diff;
      }, SECOND);

      return () => clearInterval(interval);
    }
  }, [timer.initialTimer, play, pausedTime]);

  return (
    <div className={style.clock}>
      <div>
        <div
          className={style.circular_progress}
          style={{ background: `conic-gradient(#84CC16 ${grados}deg, #18181b 0deg)` }}
        >
          <div className={style.progress_value}>
            {minutes} : {seconds}
          </div>
        </div>
      </div>

      <div className={style.buttons}>
        <button className={style.buttons__btn} onClick={handlePlay}>
          {play ? 'Pause' : 'Play'}
        </button>

        <button className={style.buttons__btn}>Reset</button>
      </div>
    </div>
  );
};

function formatTime(time: number) {
  return Math.floor(time).toString().padStart(2, '0');
}
export default Clock;
