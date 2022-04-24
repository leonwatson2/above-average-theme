import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import { SocialIcon } from 'react-social-icons';
import { toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.css';

import { isMobile } from '../../Shared/utils';
import { useSocialLinks } from '../../utils/SocialLinkContext';

export const SocialButtons: FC = () => {
  const socialLinks = useSocialLinks();
  const emailToast = () =>
    toast.info('Copied to Clipboard', {
      position: toast.POSITION.TOP_CENTER,
      className: styles.toast,
    });
  const emailAction = () => {
    if (isMobile()) {
      const email = document.createElement('a');
      email.href = 'mailto:us@aboveaveragescrubs.com';
      email.click();
    } else {
      navigator.clipboard.writeText('us@aboveaveragescrubs.com');
      emailToast();
    }
  };
  return (
    <Box
      flexBasis={{ xs: '55%' }}
      flexWrap={'wrap'}
      flexGrow={{ xs: '1' }}
      justifyContent={'end'}
      sx={{ display: { xs: 'flex' } }}
    >
      {socialLinks.map((prop, key) => {
        return (
          <Box
            tabIndex={0}
            title={prop.textContent}
            key={key}
            display={{ xs: 'flex' }}
            margin={'4px'}
            className={styles.socialButton}
          >
            <SocialIcon
              tabIndex={-1}
              url={prop.href}
              network={prop.network}
              target={'_blank'}
            />
          </Box>
        );
      })}

      <Box
        tabIndex={0}
        display={{ xs: 'flex' }}
        margin={'4px'}
        style={{ cursor: 'pointer' }}
        title={'us@aboveaveragescrubs.com'}
        onClick={() => {
          emailAction();
        }}
        onKeyPress={(e) => e.key === 'Enter' && emailAction()}
      >
        <SocialIcon network={'email'} />
      </Box>
      <Outlet />
    </Box>
  );
};
