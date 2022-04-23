import React, { FC, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocialLinks } from '../../utils';

export const SocialRedirects: FC = () => {
  const socialLinks = useSocialLinks();
  const { socialAccount } = useParams<{ socialAccount: string }>();

  const navigate = useNavigate();
  const redirectRef = useRef<HTMLAnchorElement>();
  const acccount = socialLinks.find(
    (account) =>
      account.textContent.toLowerCase().replaceAll(' ', '-') ===
      socialAccount?.toLowerCase()
  );
  useEffect(() => {
    if (acccount) redirectRef?.current?.click();
    navigate('/', { replace: true });
  }, [socialAccount]);

  return (
    <a
      href={acccount?.href || '/'}
      target={'_blank'}
      rel='noopener noreferrer'
      hidden
      ref={redirectRef}
    >
      Redirect
    </a>
  );
};
