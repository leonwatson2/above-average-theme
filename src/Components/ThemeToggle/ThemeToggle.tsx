import React, { FC } from 'react';
import { useThemeContext } from '../../Shared/Context';
import styles from './styles.module.css';
import cx from 'classnames';
export const ThemeToggle: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const theme = useThemeContext();
  return (
    <button
      className={cx(styles.outerContainer, { [styles.light]: theme.light })}
      onClick={onClick}
    >
      <div className={styles.container}>
        <div className={styles.circle}>
          <div className={styles.cloud}></div>
        </div>
      </div>
    </button>
  );
};
