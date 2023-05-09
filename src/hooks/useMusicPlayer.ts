import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PlayingStatusAtom, QueueAtom, SelectedMusicAtom } from "../utils/atom";

type MusicPlayerHookPropType = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

const useMusicPlayer = ({ audioRef }: MusicPlayerHookPropType) => {
  const [isPlaying, setIsPlaying] = useRecoilState(PlayingStatusAtom);
  const [songProgress, setSongProgress] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [queueLength, setQueueLength] = useState(0);
  const [selectedMusic, setSelectedMusic] = useRecoilState(SelectedMusicAtom);
  const queue = useRecoilValue(QueueAtom);

  const allowNext = useMemo(() => {
    console.log(currentSongIndex, queueLength);
    if (currentSongIndex + 1 < queueLength) {
      return true;
    } else {
      return false;
    }
  }, [currentSongIndex, queueLength]);

  const allowPrev = useMemo(() => {
    console.log(currentSongIndex, queueLength);
    if (currentSongIndex - 1 < 0) {
      return false;
    } else {
      return true;
    }
  }, [currentSongIndex]);

  /**
   * a function that toggles between play and pause
   */
  const playNPause = () => {
    setIsPlaying((prev) => !prev);
  };

  /**
   * a function that is supposed to be passed to onTimeUpdated prop
   * of the audio tag. it updates the audio progress whenever timeUpdate
   * hook is called
   */
  const onPlaying = () => {
    if (audioRef.current?.currentTime === audioRef.current?.duration) {
      if (!allowNext) {
        setIsPlaying(false);
        return;
      }
      playNext();
    }
    setSongProgress(audioRef.current?.currentTime || 0);
  };

  /**
   * the onchange handler to update the audio currentTime based on the
   * input value change.
   * @param e onchange event
   */
  const updateProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target?.value);
    }
    setSongProgress(Number(e.target?.value || 0));
  };

  /**
   * function that updates selected song to the next one in the queue
   */
  const playNext = () => {
    if (allowNext && queue) {
      setSelectedMusic(queue.songs[currentSongIndex + 1]);
    }
  };

  /**
   * function that updates selected song to the prev one in the queue
   */
  const playPrev = () => {
    if (allowPrev && queue) {
      setSelectedMusic(queue.songs[currentSongIndex - 1]);
    }
  };

  /**
   * an effect that alters the audio tag play and pause
   */
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  /**
   * an effect that updates the currentSongIndex based on the
   * selectedMusic or the queue
   */
  useEffect(() => {
    const index = queue?.songs?.findIndex(
      (each) => each._id === selectedMusic?._id
    );
    console.log(index, "index", selectedMusic, queue?.songs);
    if (index === undefined || index < 0) return;
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
    setCurrentSongIndex(index);
    setQueueLength(queue?.songs.length || 0);
  }, [selectedMusic, queue]);

  return {
    isPlaying,
    songProgress,
    allowNext,
    allowPrev,
    playNPause,
    onPlaying,
    updateProgress,
    playNext,
    playPrev,
  };
};

export default useMusicPlayer;
