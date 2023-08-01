import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'

export default function Home() {
  
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [trendingPeople, setTrendingPeople] = useState([])

  async function GetTrending(mediaType, callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f521fd813142db7585db6b91b387b9aa`)
    callback(data.results)
  }
  
  useEffect(()=> {
    GetTrending("movie", setTrendingMovies)
    GetTrending("tv", setTrendingTv)
    GetTrending("person", setTrendingPeople)
  }, [])

  return <>
    <div className="row w-100 mt-5">
      <div className="col-md-4 d-flex justify-content-center flex-column">
        <div className="brdr w-25 mb-3"></div>
        <h2 className='text-white'>Trending Movies <br/> To Watch Now</h2>
        <p className='text-white fw-light opacity-25'>Most Watched Movies By Weeks</p>
        <div className="brdr w-100 mt-1"></div>
      </div>
      {trendingMovies.slice(0,10).map((item, index) => <MediaItem key={index} name={item.title} poster={item.poster_path} vote={item.vote_average.toFixed(1)} type={"movie"} id={item.id}/>)}
    </div>
    <div className='row mt-3'>
      <div className="col-md-4 d-flex justify-content-center flex-column">
        <div className="brdr w-25 mb-3"></div>
        <h2 className='text-white'>Trending Shows <br/> To Watch Now</h2>
        <p className='text-white fw-light opacity-25'>Most Watched Shows By Weeks</p>
        <div className="brdr w-100 mt-1"></div>
      </div>
      {trendingTv.slice(0,10).map((item, index) => <MediaItem key={index} name={item.name} poster={item.poster_path} vote={item.vote_average.toFixed(1)} type={"tv"} id={item.id}/>)}
    </div>
    <div className='row mt-3'>
      <div className="col-md-4 d-flex justify-content-center flex-column">
        <div className="brdr w-25 mb-3"></div>
        <h2 className='text-white'>Trending People <br/> To Watch Now</h2>
        <p className='text-white fw-light opacity-25'>Trending Watched People By Weeks</p>
        <div className="brdr w-100 mt-1"></div>
      </div>
      {trendingPeople.slice(0,10).map((item, index) => <MediaItem key={index} name={item.name} poster={item.profile_path} type={"person"} id={item.id}/>)}
    </div>
    
    
  </>
}
