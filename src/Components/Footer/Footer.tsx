import React, { FC } from 'react';

import { SocialButtons } from 'Components/SocialButtons';
import styles from './styles.module.css';

export const Footer: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.socials}>
          <SocialButtons />
        </div>
      </div>
    </div>
  );
};
