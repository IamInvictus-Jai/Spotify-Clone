import React, { useEffect, useRef } from 'react';
import DisplayHome from './DisplayHome';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayAlbum from './DisplayAlbum';
import { albumsData } from '../assets/assets';


function Display() {

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');
  const albumId = isAlbum ? location.pathname.slice(-1) : '';
  const bgColor = albumsData[Number(albumId)].bgColor;

  useEffect(()=> {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(to top, ${bgColor}, #121212)`
    } else {
      displayRef.current.style.background = '#121212'
    }
  }, [isAlbum, bgColor])

  return (
    <div ref={displayRef} className='w-full m-2 px-6 pt-4 rounded bh-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={<DisplayHome />}/>
            <Route path='/album/:id' element={<DisplayAlbum />}/>
        </Routes>
    </div>
  )
}

export default Display