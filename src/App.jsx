// import Function from "./Components/function/Function";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from './Components/Layout/Layout';
import Home from "./Components/Home/Home"
import TV from "./Components/TV/TV"
import Movies from "./Components/Movies/Movies"
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Notfound from './Components/Notfound/Notfound';
import MediaPage from './MediaPage/MediaPage';

let routers = createHashRouter([
    {path:"/", element:<Layout/>, children:[
        {index:true, element:<Home/>},
        {path:"movies", element:<Movies/>},
        {path:"tv", element:<TV/>},
        {path:"media/:Mtype/:Mid", element:<MediaPage/>},
        {path:"*", element:<Notfound/>}
    ]}
])

export default function App(){


    let [trendingMovies, setTrendingMovies] = useState([]);

    async function GetMovies() {
        let {data} = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=f521fd813142db7585db6b91b387b9aa")
        setTrendingMovies(data.results)
    }

    useEffect(() => {
        GetMovies()
    }, [])


    return <>
        <RouterProvider router={routers}/>
    </>
}