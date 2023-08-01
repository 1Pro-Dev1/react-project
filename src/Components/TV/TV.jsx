import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MediaItem from '../MediaItem/MediaItem';

const API_KEY = 'f521fd813142db7585db6b91b387b9aa';
const API_URL = 'https://api.themoviedb.org/3/discover/tv';

const MoviesApp = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          page: page,
        },
      });

      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    const newMovies = await fetchMovies(nextPage);

    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const loadInitialMovies = async () => {
      const initialMovies = await fetchMovies(currentPage);
      setMovies(initialMovies);
    };

    loadInitialMovies();
  }, []);

  return (
    <div className='mt-5'>
      <div className="movie-list container">
        <div className="row">
          <div className="col-md-4 d-flex justify-content-center flex-column">
            <div className="brdr w-25 mb-3"></div>
            <h2 className='text-white'>Popular TV Shows <br/> To Watch Now</h2>
            <p className='text-white fw-light opacity-25'>Most Popular TV Shows</p>
            <div className="brdr w-100 mt-1"></div>
          </div>
        {movies.map((movie) => (

            <MediaItem key={movie.id} name={movie.name} poster={movie.poster_path} vote={movie.vote_average.toFixed(1)} type={"tv"} id={movie.id}/>
        ))}
        </div>

      </div>
      <button onClick={handleLoadMore} className='btn btn-primary w-100 mb-3 fw-bold'>Load More</button>
    </div>
  );
};

export default MoviesApp;
