import React, { FC } from 'react';
import styles from './styles.module.css';
import { PauseCircleFilled } from '@material-ui/icons';

const Play: FC<{ handleClick?: React.MouseEventHandler }> = ({
  handleClick,
}) => (
  <button className={styles.pause_svg} onClick={handleClick}>
    <PauseCircleFilled />
  </button>
);
export default Play;
