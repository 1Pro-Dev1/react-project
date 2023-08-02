import Layout from './Components/Layout/Layout';
import Home from "./Components/Home/Home"
import TV from "./Components/TV/TV"
import Movies from "./Components/Movies/Movies"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Notfound from './Components/Notfound/Notfound';
import MediaPage from './MediaPage/MediaPage';

let routers = createBrowserRouter([
    {path:"/", element:<Layout/>, children:[
        {index:true, element:<Home/>},
        {path:"movies", element:<Movies/>},
        {path:"tv", element:<TV/>},
        {path:"media/:Mtype/:Mid", element:<MediaPage/>},
        {path:"*", element:<Notfound/>}
    ]}
])

export default function App(){

    return <>
        <RouterProvider router={routers}/>
    </>
}