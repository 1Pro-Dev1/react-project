import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function MediaPage() {
    let {Mid, Mtype} = useParams();
    const [mediaData, setMediaData] = useState({})
    const [castData, setCastData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [personMedia, setPersonMedia] = useState([])

async function getMediaData(id, type) {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=f521fd813142db7585db6b91b387b9aa`
      );
      let cast = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=f521fd813142db7585db6b91b387b9aa`
      );
      if (Mtype==="person") {        
        let prsnMedia = await axios.get(
          `https://api.themoviedb.org/3/person/${Mid}/combined_credits?api_key=f521fd813142db7585db6b91b387b9aa`
        )
        setPersonMedia(prsnMedia.data.cast)
      }
      setMediaData(data);
      setCastData(cast.data.cast);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set loading to false even on error to handle the failed request
    }
  }

    useEffect(() => {
        getMediaData(Mid, Mtype)
    },[Mid, Mtype])

  const handleCastLinkClick = (id, media) => {
    setIsLoading(true); // Set loading to true before making the API call with the new cast member id
    getMediaData(id, media);
  };

     if (isLoading) {
    return   <div className='w-100 d-flex align-items-center justify-content-center' style={{height:"calc(100vh - 56px)"}}>
            <h1 className='text-white'>
                Loading...
            </h1>
        </div> // You can replace this with your loading spinner component
  }
  return <>
    <div className="row mt-5 text-white">
        <div className="col-md-4">
            {Mtype==="person"?
            <img alt='alt' src={`${mediaData.profile_path===null?"https://cdn.discordapp.com/attachments/1095603862871740418/1133817660686225510/person.jpg":`https://image.tmdb.org/t/p/w500/${mediaData.profile_path}`}`} className='w-100' />:
            <img alt='alt' src={`https://image.tmdb.org/t/p/w500${mediaData.poster_path}`} className='w-100' />
            }
            {Mtype==="person"?
            <h1 className='d-block d-md-none mt-1'>{mediaData.title}{mediaData.name}</h1>:""}
            {Mtype==="person"?
            <div>
              <h3 className='mt-2'>Personal Info:</h3>
              <div className="detail mt-3">
                <h5 className='mb-0'>Known for:</h5>
                <p >{mediaData.known_for_department!==null?`${mediaData.known_for_department}`:"unknown"}</p>
              </div>
              <div className="detail mt-3">
                <h5 className='mb-0'>Gender:</h5>
                <p>{mediaData.gender!==0?`${mediaData.gender===1?"Female":`${mediaData.gender===2?"Male":"Non-binary"}`}`:"Not set"}</p>
              </div>
              <div className="detail mt-3">
                <h5 className='mb-0'>Birthday:</h5>
                <p >{mediaData.birthday!==null?`${mediaData.birthday}`:"unknown"}</p>

              </div>
              {mediaData.deathday?
                            <div className="detail mt-3">
                <h5 className='mb-0'>Deathday:</h5>
                <p >{mediaData.deathday}</p>
              </div>:""}
              <div className="detail mt-3">
                <h5 className='mb-0'>Place of Birth:</h5>
                <p >{mediaData.place_of_birth!==null?`${mediaData.place_of_birth}`:"unknown"}</p>
              </div>
            </div>:""}
        </div>
        <div className="col-md-8">
            {Mtype==="person"?<h1 className='d-none d-md-block'>{mediaData.title}{mediaData.name}</h1>:<h1>{mediaData.title}{mediaData.name}</h1>}
            {Mtype!=="person"?<h6 className='opacity-25'>{mediaData.tagline}</h6>:""}
            {Mtype!=="person"?<div className="d-flex flex-row mt-3">
                {mediaData.genres?.map((genre, i)=> <p className='m-0 bg-primary py-1 px-2 rounded-2 me-2' key={i}>{genre.name}</p>)}
            </div>:""}
            {Mtype!=="person"?<h5 className='mt-4'>Vote: {mediaData.vote_average?.toFixed(1)}</h5>:""}
            {Mtype!=="person"?<h5 className='mt-4'>Vote count: {mediaData.vote_count}</h5>:""}
            {Mtype!=="person"?<h5 className='mt-4'>Popularity: {mediaData.popularity}</h5>:""}
            {Mtype==="tv"||Mtype==="person"?"":<h5 className='mt-4'>Release date: {mediaData.release_date}</h5>}
            {Mtype==="person"?<><h4 className='mt-3'>Biography:</h4><h5 className='mt-1 opacity-25'>{mediaData.biography?mediaData.biography:"unavailable"}</h5></>:
            <h5 className='mt-4 opacity-25'>{mediaData.overview}</h5>
            }
            {Mtype==="person"?<><h1>Known for:</h1>
            <div className="d-flex flex-row mb-1" style={{flexWrap:"nowrap", overflowX:"scroll"}}>
                {personMedia?.slice(0,10).map((media) => 
                <Link className='col-md-2 col-8 me-3 mb-2 bg-white rounded-3 overflow-hidden' to={`/media/${media.media_type}/${media.id}`} onClick={() => handleCastLinkClick(media.id, media.media_type)} key={media.id} >
                    <img src={media.poster_path===null?"https://cdn.discordapp.com/attachments/1095603862871740418/1133817660686225510/person.jpg":`https://image.tmdb.org/t/p/w500${media.poster_path}`} className='w-100' alt="" />
                    <p className='m-0 text-black ms-2'>{media.title}</p>
                </Link>
                )}

            </div></>:""}
        </div>
        {Mtype!=="person"?<div className="col-md-12 row mt-5">
            <h1>Actors:</h1>
            <div className="d-flex flex-row mb-1 ms-0" style={{flexWrap:"nowrap", overflowX:"scroll"}}>
                {castData.map((caster) => caster.known_for_department==="Acting"?
                <Link className='col-md-2 col-8 me-3 mb-2 bg-white rounded-3 overflow-hidden' to={`/media/person/${caster.id}`} onClick={() => handleCastLinkClick(caster.id, "person")} key={caster.id}>
                    <img src={caster.profile_path===null?"https://cdn.discordapp.com/attachments/1095603862871740418/1133817660686225510/person.jpg":`https://image.tmdb.org/t/p/w500${caster.profile_path}`} className='w-100' alt="" />
                    <p className='m-0 text-black ms-2 fw-bold'>{caster.name}</p>
                    <p className='m-0 text-black ms-2 fw-light'>{caster.character}</p>
                </Link>
                :"")}

            </div>
        </div>:""}
    </div>
  </>
}
