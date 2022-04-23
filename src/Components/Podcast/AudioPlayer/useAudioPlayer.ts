import React, { useState, useEffect } from 'react';

const useAudioPlayer = (audioElementRef: React.RefObject<HTMLAudioElement>) => {
  const [duration, setDuration] = useState(1);
  const [curTime, setCurTime] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number | null>(0);
  const [volume, setVolume] = useState<number | undefined>(0.6);

  const changeVolume = (newVolume: number) => {
    newVolume > 1
      ? setVolume(1)
      : newVolume < 0
      ? setVolume(0)
      : setVolume(newVolume);
  };

  useEffect(() => {
    if (audioElementRef?.current) {
      audioElementRef.current.volume = volume || 0;
    }
  }, [volume]);
  useEffect(() => {
    if (clickedTime && clickedTime !== curTime) {
      if (audioElementRef?.current?.currentTime) {
        audioElementRef.current.currentTime = clickedTime;
      }
      setClickedTime(null);
    }
  }, [curTime, clickedTime]);
  useEffect(() => {
    playing
      ? audioElementRef.current?.play()
      : audioElementRef.current?.pause();
  }, [playing, audioElementRef.current]);

  const setAudioData = () => {
    audioElementRef.current?.volume != 0.4;
    setVolume(audioElementRef.current?.volume || 0);
    setDuration(audioElementRef.current?.duration || 0);
    setCurTime(audioElementRef.current?.currentTime || 0);
  };

  const setAudioTime = () => {
    setCurTime(audioElementRef.current?.currentTime || 0);
  };

  useEffect(() => {
    audioElementRef.current?.addEventListener('loadeddata', () => {
      setAudioData();
      setPlaying(true);
    });

    audioElementRef.current?.addEventListener('timeupdate', setAudioTime);
    audioElementRef.current?.addEventListener('error', () => {
      setError('Error happened');
    });

    const cleanup = () => {
      audioElementRef.current?.removeEventListener('loadeddata', setAudioData);
      audioElementRef.current?.removeEventListener('timeupdate', setAudioTime);
    };
    return cleanup;
  }, [audioElementRef.current]);

  return {
    curTime,
    duration,
    playing,
    setError,
    error,
    setPlaying,
    setClickedTime,
    volume,
    setVolume: changeVolume,
  };
};

export default useAudioPlayer;
