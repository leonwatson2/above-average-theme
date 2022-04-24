import { EpisodeType, SocialLinkType, WpEpisode } from 'Shared/Types';

type WpSocialLink = {
  title: {
    rendered: string;
  };
  acf: {
    link: string;
  };
};

export const getEpisodes: (pageNumber?: number) => Promise<{
  episodes: Array<EpisodeType>;
  totalPages: number;
}> = async (pageNumber = 1) => {
  const response = fetch(
    process.env.PUBLIC_URL + '/wp-json/wp/v2/podcast?page1'
  );
  const totalPages = await +response.then((res) =>
    res.headers.get('X-WP-TotalPages')
  );
  const wpEpisodes: WpEpisode[] = await response.then((res) => res.json());
  const episodes: EpisodeType[] = wpEpisodes.map((ep, i) => ({
    title: ep.title.rendered,
    file: ep.player_link,
    image: null,
    description: ep.excerpt.rendered,
    number: ep.menu_order,
    link: ep.slug,
  }));

  return { episodes, totalPages };
};

export const getSocials: () => Promise<Array<SocialLinkType>> = async () => {
  const wpSocials: WpSocialLink[] = await fetch(
    process.env.PUBLIC_URL + '/wp-json/wp/v2/social_link'
  ).then((res) => res.json());

  const socials: SocialLinkType[] = wpSocials.map((wpSocial) => {
    return {
      href: wpSocial.acf.link,
      textContent: wpSocial.title.rendered,
    };
  });
  return socials;
};
