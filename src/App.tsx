import React, { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import {
  ContextWrapper,
  getEpisodes,
  getSocials,
  EpisodesContext,
} from './utils';
import { Home } from './Components/Home';
import { SocialRedirects } from './Components/SocialRedirects';
import { EpisodeType, SocialLinkType } from 'Shared/Types';
import { SocialLinkContext } from './utils/SocialLinkContext';

const App: FC = () => {
  const [episodeState, setEpisodes] = useState<{
    episodes: Array<EpisodeType>;
    totalPages: number;
  }>({ episodes: [], totalPages: 0 });
  const [socials, setSocials] = useState<Array<SocialLinkType>>([]);

  useEffect(() => {
    getEpisodes().then(({ episodes: episodesData, totalPages }) => {
      const allEps: Array<EpisodeType> = new Array(10).fill(
        episodesData.sort((a, b) => b.number - a.number)[0]
      );
      setEpisodes({ episodes: allEps, totalPages });
    });
    getSocials().then((socialsData) => {
      setSocials(socialsData);
    });
  }, []);

  return (
    <ContextWrapper>
      <SocialLinkContext.Provider value={socials}>
        <EpisodesContext.Provider
          value={{
            ...episodeState,
            nextPage: () => {},
          }}
        >
          <Routes>
            <Route
              path={process.env.MAIN_ROUTE || '/'}
              element={<Home episodes={episodeState.episodes} />}
            >
              <Route path='podcast/:episodeLink' element={null} />
              <Route path='./socials'>
                <Route path={':socialAccount'} element={<SocialRedirects />} />
              </Route>
              <Route
                path='*'
                element={
                  <Navigate replace to={process.env.MAIN_ROUTE || '/'} />
                }
              />
            </Route>
          </Routes>
        </EpisodesContext.Provider>
      </SocialLinkContext.Provider>
    </ContextWrapper>
  );
};

export default App;
