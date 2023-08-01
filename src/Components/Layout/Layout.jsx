import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
    <Navbar/>
    <div className="container" style={{minHeight:"calc(100vh - 56px)"}}>
        <Outlet/>
    </div>
    <Footer/>
  </>
}
