import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItem({name, poster, vote, type, id}) {

  return <>
    <div className="col-md-2 mb-2">
      <Link to={`/media/${type}/${id}`} className='decoration-none'>
        <div className="position-relative">
          <img className='w-100' src={poster?`https:image.tmdb.org/t/p/w500${poster}`:`https://cdn.discordapp.com/attachments/1095603862871740418/1133817660686225510/person.jpg`}  alt="" />
          {vote?<p className='text-white position-absolute top-0 end-0 bg-primary h6 py-2 px-2'>{vote}</p>:""}
          <h6 className='text-white my-2 mt-0'>{name}</h6>
        </div>
      </Link>
    </div>
  </>
}
