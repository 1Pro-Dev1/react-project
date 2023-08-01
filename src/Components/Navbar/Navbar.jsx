import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return <>
  <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container">
    <Link className="navbar-brand h1 m-0" to="/">Movies App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
</nav>
  </>
}
