import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { EpisodeType } from '../../../Shared/Types';
import { Replay10, Forward10 } from '@material-ui/icons';

import Song from './Song';
import Play from './Play';
import Pause from './Pause';
import Bar from './Bar';
import VolumeBar from './VolumeBar';

import useAudioPlayer from './useAudioPlayer';

export const Audio = ({
  episode,
  setLatestEpisode,
}: {
  episode: EpisodeType;
  setLatestEpisode: () => void;
}) => {
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    setVolume,
    volume,
    error,
    setError,
  } = useAudioPlayer(audioElementRef);
  useEffect(() => {
    setError(null);
    setPlaying(false);
  }, [episode]);
  return (
    <div className={styles.player}>
      {error && <h2 className={styles.info}>Error Loading Audio</h2>}
      <audio ref={audioElementRef} src={episode?.file}>
        Your browser does not support the <code>audio</code> element.
      </audio>
      {!error && (
        <Song
          songName={episode?.title || ''}
          songArtist={episode?.description || ''}
        />
      )}
      <div className={styles.playPause}>
        <Replay10
          aria-label={'back-10-seconds'}
          tabIndex={0}
          onClick={() => setClickedTime(curTime - 10)}
          onKeyPress={(e) => e.key === 'Enter' && setClickedTime(curTime - 10)}
        />
        {playing ? (
          <Pause handleClick={() => setPlaying(false)} />
        ) : (
          <Play
            aria-label={'play'}
            handleClick={() => {
              if (!episode) {
                setLatestEpisode();
              }
              setPlaying(true);
            }}
          />
        )}
        <Forward10
          aria-label={'forward-10-seconds'}
          tabIndex={0}
          onClick={() => setClickedTime(curTime + 10)}
          onKeyPress={(e) => e.key === 'Enter' && setClickedTime(curTime + 10)}
        />
      </div>
      <div className={styles.controls}>
        <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => setClickedTime(time)}
        />
      </div>
      <VolumeBar
        onChangeVolume={(v) => {
          setVolume(v);
        }}
        volume={volume}
      />
    </div>
  );
};

export default Audio;
