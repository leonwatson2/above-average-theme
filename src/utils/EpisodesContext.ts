import { useContext } from 'react';
import { createContext } from 'react';
import { EpisodeType } from 'Shared/Types';

export const EpisodesContext = createContext<{
  episodes: Array<EpisodeType>;
  totalPages: number;
  nextPage: () => void;
}>({ episodes: [], totalPages: 0, nextPage: () => {} });

export const useEpisodes = () => useContext(EpisodesContext);
