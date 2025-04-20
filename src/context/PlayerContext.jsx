import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerProvider = ({children})=> {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            min: 0
        },
        duration: {
            second: 0,
            min: 0
        }
    })

    const handlePlay = ()=> {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const handlePause = ()=> {
        audioRef.current.pause();
        setPlayStatus(false);
    }


    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        await setPlayStatus(true);
    }

    const playPreviousSong = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            await setPlayStatus(true);
        }
    }

    const playNextSong = async () => {
      if (track.id < songsData.length - 1) {
        await setTrack(songsData[track.id + 1]);
        await audioRef.current.play();
        await setPlayStatus(true);
      }
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime = (
            (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration
        )
    }








    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = `${Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100)}%`
                setTime({
                  currentTime: {
                    second: Math.floor(audioRef.current.currentTime % 60),
                    min: Math.floor(audioRef.current.currentTime / 60),
                  },
                  duration: {
                    second: Math.floor(audioRef.current.duration % 60) || 0,
                    min: Math.floor(audioRef.current.duration / 60) || 0,
                  },
                });
            }
        }, 1000)
    }, [audioRef])

    const value = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        handlePlay, handlePause,
        playWithId,
        playPreviousSong, playNextSong,
        seekSong
    };

    return (<PlayerContext.Provider value={value}>
        {children}
    </PlayerContext.Provider>)
}

export default PlayerProvider