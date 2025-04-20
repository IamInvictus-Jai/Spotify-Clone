import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'

function DisplayHome() {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, idx) => {
            return (
              <AlbumItem
                key={idx}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Trending</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, idx) => {
            return (
              <SongItem
                key={idx}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DisplayHome