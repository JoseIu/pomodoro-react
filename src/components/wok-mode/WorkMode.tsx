import { useTimer } from '../../lib/hooks/useTimer';
import Break from '../break/Break';
import Focus from '../focus/Focus';
import style from './WorkMode.module.scss';

const WorkMode = () => {
  const { work } = useTimer();
  return (
    <div className={style.work}>
      <div className={style.work__mode}>
        <span className={style.work__title}>Current Mode</span>

        {work ? <Focus /> : <Break />}
      </div>
      <div className={style.work__mode}>
        <span className={style.work__title}>Next Mode</span>
        {!work ? <Focus /> : <Break />}
      </div>
    </div>
  );
};

export default WorkMode;
