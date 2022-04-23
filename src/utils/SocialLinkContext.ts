import { createContext, useContext } from 'react';
import { SocialLinkType } from '../Shared/Types';
export const defaultSocialLinks = [
  {
    href: 'https://www.instagram.com/aboveavgscrubs/',
    textContent: 'Instagram',
  },
  {
    href: 'https://www.youtube.com/channel/UCkCuImQNa6cLfUjHQOgOHiA?sub_confirmation=1',
    textContent: 'YouTube',
  },
  {
    href: 'https://vm.tiktok.com/ZM87FypaJ/',
    textContent: 'TikTok',
  },
  {
    href: 'https://podcasts.google.com/feed/aHR0cHM6Ly9hdmdzY3J1YnMucG9kb21hdGljLmNvbS9yc3MyLnhtbA',
    textContent: 'Google Podcast',
    network: 'google_play',
  },
  {
    href: 'https://podcasts.apple.com/us/podcast/the-above-average-scrubs-podcast/id1570977091',
    textContent: 'Apple Pocast',
    network: 'itunes',
  },
  {
    href: 'https://open.spotify.com/show/77jxcW6f9ToNSFXQRFB8kb',
    textContent: 'Spotify',
  },
  {
    href: 'https://discord.gg/PkJuM2JG',
    textContent: 'Discord',
  },
];
export const SocialLinkContext = createContext<Array<SocialLinkType>>([]);

export const useSocialLinks = () => useContext(SocialLinkContext);
