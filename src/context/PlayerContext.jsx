import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerProvider = ({children})=> {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const playNextBtn = useRef();
    const isFirstRender = useRef(true);

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [isLoopActive, setIsLoopActive] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            min: 0
        },
        duration: {
            second: parseInt(track.duration.split(':')[1]) || 0,
            min: parseInt(track.duration.split(':')[0]) || 0
        }
    })

    const handlePlay = ()=> {
        if (isFirstRender.current) isFirstRender.current = false;
        audioRef.current.play();
        setPlayStatus(true);
    }

    const handlePause = ()=> {
        audioRef.current.pause();
        setPlayStatus(false);
    }


    const playWithId = (id) => {
        setTrack(songsData[id]);
    }

    const playPreviousSong = () => {
        if (track.id > 0) {
            setTrack(songsData[track.id - 1]);
        }
    }

    const playNextSong = () => {
      if (track.id < songsData.length - 1) {
        setTrack(songsData[track.id + 1]);
        // audioRef.current.load(); // Load the new track
        // audioRef.current.onloadeddata = async () => {
        //   await audioRef.current.play();
        //   setPlayStatus(true);
        // };
        // await audioRef.current.play();
        // await setPlayStatus(true);
      }
    };

    const loopSong = ()=> {
        if (audioRef.current && !audioRef.current.loop) {
            
            audioRef.current.loop = true;
            setIsLoopActive(true)
        }
        else {
            audioRef.current.loop = false
            setIsLoopActive(false)
        }
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = (
            (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration
        )
    }

    useEffect(()=> {
        if (track && !isFirstRender.current) {
            audioRef.current.load();
            audioRef.current.onloadeddata = async () => {
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
    }, [track])

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
                
                
                if (audioRef.current.ended && track.id < songsData.length - 1) {
                    playNextBtn.current.click();
                } else if (track.id === songsData.length - 1) {
                    handlePause();
                }
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
        seekSong,
        playNextBtn,
        loopSong,
        isLoopActive
    };

    return (<PlayerContext.Provider value={value}>
        {children}
    </PlayerContext.Provider>)
}

export default PlayerProvider