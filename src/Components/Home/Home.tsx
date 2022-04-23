import { FC, useState } from 'react';
import { Box, IconButton, Toolbar } from '@material-ui/core';
import styles from './styles.module.css';

import { Podcast } from '../Podcast';
import { SocialButtons } from '../SocialButtons';
import { ThemeContext } from '../../Shared/Context';
import { ToastContainer } from 'react-toastify';
import GroupPhoto from '../../Assets/GroupPhotoSimone.png';
import GroupPhoto1x from '../../Assets/GroupPhotoSimone1kx1k.png';
import Logo from '../../Assets/Logo.png';

import 'react-toastify/dist/ReactToastify.css';
import { EpisodeType } from '../../Shared/Types';

export const Home: FC<{ episodes: Array<EpisodeType> }> = ({ episodes }) => {
  const [theme] = useState(true);
  return (
    <ThemeContext.Provider value={{ light: theme }}>
      <Toolbar>
        <IconButton
          edge='start'
          className={styles.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <img src={Logo} alt='Group Photo'></img>
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />

        <SocialButtons />
      </Toolbar>

      <div className={styles.container}>
        <div className={styles.pictureContainer}>
          <div className={styles.imageContainer}>
            <img
              src={GroupPhoto}
              srcSet={`${GroupPhoto} 3x, ${GroupPhoto1x} 1x`}
              alt='Group Photo'
            ></img>
          </div>
        </div>
        <Podcast episodes={episodes} />
        <ToastContainer />
      </div>
    </ThemeContext.Provider>
  );
};
