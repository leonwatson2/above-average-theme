// import { GoogleSpreadsheet } from 'google-spreadsheet';

import { EpisodeType, SocialLinkType, WpEpisode } from 'Shared/Types';
type WpSocialLink = {
  title: {
    rendered: string;
  };
  acf: {
    link: string;
  };
};
export const getSheetData: () => Promise<{
  episodes: EpisodeType[];
  socials: SocialLinkType[];
}> = async () => {
  const wpEpisodes: WpEpisode[] = await fetch(
    process.env.PUBLIC_URL + '/wp-json/wp/v2/podcast'
  ).then((res) => res.json());
  const wpSocials: WpSocialLink[] = await fetch(
    process.env.PUBLIC_URL + '/wp-json/wp/v2/social_link'
  ).then((res) => res.json());

  const episodes: EpisodeType[] = wpEpisodes.map((ep, i) => ({
    title: ep.title.rendered,
    file: ep.player_link,
    image: null,
    description: ep.excerpt.rendered,
    number: ep.menu_order,
    link: ep.slug,
  }));
  const socials: SocialLinkType[] = wpSocials.map((wpSocial) => {
    return {
      href: wpSocial.acf.link,
      textContent: wpSocial.title.rendered,
    };
  });
  return {
    episodes: episodes,
    socials,
  };
};
