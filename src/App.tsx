import React, { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { ContextWrapper } from './utils';
import { Home } from './Components/Home';
import { SocialRedirects } from './Components/SocialRedirects';
import { getSheetData } from './Shared/googleapi';
import { EpisodeType, SocialLinkType } from 'Shared/Types';
import { SocialLinkContext } from './utils/SocialLinkContext';
const App: FC = () => {
  const [episodes, setEpisodes] = useState<Array<EpisodeType>>([]);
  const [socials, setSocials] = useState<Array<SocialLinkType>>([]);

  useEffect(() => {
    getSheetData().then((data) => {
      setEpisodes(data.episodes.sort((a, b) => b.number - a.number));
      setSocials(data.socials);
    });
  }, []);

  return (
    <ContextWrapper>
      <SocialLinkContext.Provider value={socials}>
        <Routes>
          <Route
            path={process.env.MAIN_ROUTE || '/'}
            element={<Home episodes={episodes} />}
          >
            <Route path='podcast/:episodeLink' element={null} />
            <Route path='./socials'>
              <Route path={':socialAccount'} element={<SocialRedirects />} />
            </Route>
            <Route
              path='*'
              element={<Navigate replace to={process.env.MAIN_ROUTE || '/'} />}
            />
          </Route>
        </Routes>
      </SocialLinkContext.Provider>
    </ContextWrapper>
  );
};

export default App;
