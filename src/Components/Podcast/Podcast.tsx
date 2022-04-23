import React, { FC, useState } from 'react';
import { PlayArrowRounded as PlayButton } from '@material-ui/icons';
import cx from 'classnames';

import styles from './styles.module.css';

import PodcastStock from '../../Assets/podcast-stock.jpg';
import { EpisodeType } from '../../Shared/Types';
import { AudioPlayer } from './AudioPlayer';

export const Podcast: FC<{ episodes: Array<EpisodeType> }> = ({ episodes }) => {
  const [playingEpisode, setEpisode] = useState<EpisodeType>(null);
  return (
    <div className={styles.podcastContainer}>
      <h2>PODCAST</h2>
      <div className={styles.podcastEpisodes}>
        {episodes.map((ep) => (
          <div
            tabIndex={0}
            aria-label={`Episode ${ep?.number}: ${ep?.title}`}
            key={ep?.title}
            className={cx(styles.podcastEpisode, {
              [styles.selected]: ep?.title === playingEpisode?.title,
            })}
            onClick={() => {
              if (playingEpisode?.file !== ep?.file) setEpisode(ep);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && playingEpisode?.file !== ep?.file)
                setEpisode(ep);
            }}
          >
            <div className={styles.equalizer}>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
            <PlayButton />
            <div className={styles.thumbnail}>
              <img src={ep?.image || PodcastStock} alt='' />
            </div>
            <div className={styles.title}>
              <h4 dangerouslySetInnerHTML={{ __html: ep?.title || '' }}></h4>
            </div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: ep?.description || '' }}
            >
              {}
            </div>
            <h2 aria-label={'Podcast number'} className={styles.number}>
              {ep?.number}
            </h2>
          </div>
        ))}
      </div>
      <AudioPlayer
        episode={playingEpisode}
        setLatestEpisode={() => {
          setEpisode(episodes[0]);
        }}
      />
    </div>
  );
};
export default Podcast;
