import React, { FC, useRef } from 'react';
import { duration } from 'moment';
import styles from './styles.module.css';
import cx from 'classnames';

const Bar: FC<{
  durationB: number;
  curTime: number;
  onTimeUpdate: (time: number) => void;
}> = ({ durationB, curTime, onTimeUpdate }) => {
  const barProgressRef = useRef<HTMLDivElement>(null);
  const curPercentage = (curTime / (durationB || 1)) * 100;

  const formatDuration = (durationF: number) => {
    const durM = duration(durationF || 1, 'seconds');
    const [hours, minutes, seconds] = [
      Math.floor(durM.asHours()),
      Math.floor(durM.asMinutes()) % 60,
      Math.floor(durM.asSeconds()) % 60,
    ];
    return `${hours}:${minutes > 9 ? minutes : '0' + minutes}:${
      seconds > 9 ? seconds : '0' + seconds
    }`;
  };

  const calcClickedTime: (e: MouseEvent | React.MouseEvent) => number = (e) => {
    const clickPositionInPage = e.pageX;
    const barStart =
      barProgressRef.current?.getBoundingClientRect().left ||
      0 + window.scrollX;
    const barWidth = barProgressRef.current?.offsetWidth || 0;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  };

  const handleTimeDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove: MouseEvent) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    window.addEventListener('mousemove', updateTimeOnMove);

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', updateTimeOnMove);
    });
  };

  return (
    <div className={styles.bar}>
      <span className={cx(styles.barTime, styles.curTime)}>
        {formatDuration(curTime)}
      </span>
      <div
        className={styles.barProgress}
        ref={barProgressRef}
        style={{
          background: `linear-gradient(to right, orange ${curPercentage}%, white 0)`,
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span
          className={styles.barProgressKnob}
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <span className={cx(styles.barTime, styles.duration)}>
        {formatDuration(duration)}
      </span>
    </div>
  );
};

export default Bar;
