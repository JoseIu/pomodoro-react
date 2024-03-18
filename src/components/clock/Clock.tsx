import { useTimer } from '../../lib/hooks/useTimer';
import style from './Clock.module.scss';
const Clock = () => {
  const { grades, minutes, seconds, play, handlePlay } = useTimer();

  return (
    <div className={style.clock}>
      <div>
        <div
          className={style.circular_progress}
          style={{ background: `conic-gradient(#84CC16 ${grades}deg, #18181b 0deg)` }}
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
export default Clock;
