import Clock from '../clock/Clock';
import WorkMode from '../wok-mode/WorkMode';

import style from './Timer.module.scss';

const Timer = () => {
  return (
    <section className={style.timer}>
      <Clock />

      <WorkMode />
    </section>
  );
};

export default Timer;
