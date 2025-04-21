import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

function Player() {

  const {
    seekBar,
    seekBg,
    track,
    time,
    playStatus,
    handlePlay,
    handlePause,
    playPreviousSong,
    playNextSong,
    seekSong,
    playNextBtn,
    loopSong,
    isLoopActive
  } = useContext(PlayerContext);


  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="flex items-center gap-4">
        <img className="w-8 rounded-full mt-4 md:mt-0 lg:w-12" src={track.image} alt="" />
        <div>
          <p className="hidden md:block">{track.name}</p>
          <p className="hidden md:block">{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img
            onClick={playPreviousSong}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt=""
          />
          {!playStatus && (
            <img
              onClick={handlePlay}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}
          {playStatus && (
            <img
              onClick={handlePause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          )}
          <img
            onClick={playNextSong}
            ref={playNextBtn}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt=""
          />
          {!isLoopActive && (
            <img
              onClick={() => {
                loopSong();
              }}
              className="w-5 cursor-pointer"
              src={assets.repeat_icon}
              alt=""
            />
          )}
          {isLoopActive && (
            <img
              onClick={() => {
                loopSong();
              }}
              className="w-5 cursor-pointer"
              src={assets.repeat_on_icon}
              alt=""
            />
          )}
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.min}:{time.currentTime.second < 10 ? "0" : ""}
            {time.currentTime.second}
          </p>
          <div
            onClick={(e) => {
              seekSong(e);
            }}
            ref={seekBg}
            className="w-[60dvw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-[0%] bg-green-400 rounded-full"
            />
          </div>
          <p>
            {time.duration.min}:{time.duration.second < 10 ? "0" : ""}
            {time.duration.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        <img className="w-4" src={assets.volume_icon} alt="" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
}

export default Player