import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import { isMobile } from '../../../Shared/utils';

const calcClickedVolume: (
  e: MouseEvent | React.MouseEvent,
  barVolumeRef: React.RefObject<HTMLDivElement>
) => number = (e, barVolumeRef) => {
  const clickPositionInPage = e.pageX;
  const barStart =
    barVolumeRef.current?.getBoundingClientRect().left || 0 + window.scrollX;
  const barWidth = barVolumeRef.current?.offsetWidth || 0;
  const clickPositionInBar = clickPositionInPage - barStart;

  const percent = clickPositionInBar / barWidth;
  return percent < 0 ? 0 : percent > 1 ? 1 : percent;
};
export const VolumeBar = ({
  volume,
  onChangeVolume,
}: {
  volume?: number;
  onChangeVolume: (newVolume: number) => void;
}) => {
  const [lastVolume, changeLastVolume] = useState<number>(1);
  const barVolumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (volume) changeLastVolume(volume);
  }, [volume, changeLastVolume]);
  const handleTimeDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onChangeVolume(calcClickedVolume(e, barVolumeRef));

    const updateTimeOnMove = (eMove: MouseEvent) => {
      onChangeVolume(calcClickedVolume(eMove, barVolumeRef));
    };

    window.addEventListener('mousemove', updateTimeOnMove);

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', updateTimeOnMove);
    });
  };
  return (
    <div className={styles.volumeContainer} hidden={isMobile()}>
      <div className={styles.icon}>
        {volume ? (
          <VolumeUp
            onClick={() => {
              onChangeVolume(0);
            }}
          />
        ) : (
          <VolumeOff
            onClick={() => {
              onChangeVolume(lastVolume);
            }}
          />
        )}
      </div>
      <input type='checkbox' name='volume' id='volume' />
      <div
        className={styles.volumeBar}
        onMouseDown={(e) => handleTimeDrag(e)}
        ref={barVolumeRef}
      >
        <div
          tabIndex={0}
          onKeyDown={(e) => {
            e.key === 'ArrowLeft' && onChangeVolume((volume || 0) - 0.1);
            e.key === 'ArrowRight' && onChangeVolume((volume || 0) + 0.1);
          }}
          onMouseDown={(e) => handleTimeDrag(e)}
          className={styles.volumeBall}
          style={{
            left: `${(volume || 0) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
export default VolumeBar;
