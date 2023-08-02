import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return <>
  {/* <nav className="navbar navbar-dark">
  <div className="container d-flex flex-row justify-content-bettwen">
    <Link className="navbar-brand h1 m-0" to="/">Movies App</Link>
    <div className="navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="tv">TV</Link>
        </li>
      </ul>
    </div>
  </div>
</nav> */}
<nav className='w-100'>
  <div className="container text-white py-3 d-flex flex-row align-items-center justify-content-between">
    <Link className=" h1 m-0" to="/">Movies App</Link>
    <div className="links d-flex flex-row align-items-center">
    <Link to="/" className='mx-2 text-white'>Home</Link>
    <Link to="/movies" className='mx-2 text-white'>Movies</Link>
    <Link to="/tv" className='mx-2 text-white'>TV</Link>
    </div>
  </div>
</nav>
  </>
}
