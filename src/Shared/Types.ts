export type EpisodeType = {
  title: string;
  file: string;
  image: string | null;
  description: string;
  number: number;
  link: string;
} | null;

export type SocialLinkType = {
  href: string;
  textContent: string;
  network?: string;
};

export interface WpEpisode {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: GUID;
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: GUID;
  content: Content;
  excerpt: Content;
  author: number;
  featured_media: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Meta;
  tags: any[];
  series: any[];
  acf: { description: string };
  episode_featured_image: boolean;
  episode_player_image: string;
  download_link: string;
  player_link: string;
  audio_player: string;
  episode_data: EpisodeData;
  _links: Links;
}

export interface Links {
  self: About[];
  collection: About[];
  about: About[];
  author: Author[];
  replies: Author[];
  'wp:attachment': About[];
  'wp:term': WpTerm[];
  curies: Cury[];
}

export interface About {
  href: string;
}

export interface Author {
  embeddable: boolean;
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}

export interface WpTerm {
  taxonomy: string;
  embeddable: boolean;
  href: string;
}

export interface Content {
  rendered: string;
  protected: boolean;
}

export interface EpisodeData {
  playerMode: string;
  subscribeUrls: SubscribeUrls;
  rssFeedUrl: string;
  embedCode: string;
}

export interface SubscribeUrls {
  apple_podcasts: ApplePodcasts;
  stitcher: ApplePodcasts;
  google_podcasts: ApplePodcasts;
  spotify: ApplePodcasts;
}

export interface ApplePodcasts {
  key: string;
  url: string;
  label: string;
  class: string;
  icon: string;
}

export interface GUID {
  rendered: string;
}

export interface Meta {
  episode_type: string;
  audio_file: string;
  cover_image: string;
  cover_image_id: string;
  duration: string;
  filesize: string;
  date_recorded: Date;
  explicit: string;
  block: string;
  filesize_raw: string;
}
