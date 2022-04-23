import React, { FC } from 'react';
import { PlayCircleFilled } from '@material-ui/icons';
import styles from './styles.module.css';

const Play: FC<{ handleClick?: React.MouseEventHandler }> = ({
  handleClick,
}) => (
  <button className={styles.playBtn__svg} onClick={handleClick}>
    <PlayCircleFilled />
  </button>
);

export default Play;
