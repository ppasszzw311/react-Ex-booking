import React from 'react';
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Feature from '../components/Feature';
import Footer from '../components/Footer'
import Announcement from '../components/Announcement'
import "./home.scss"

const Home = () => {
  return (
    <div className='home'>
    <Navbar/>
    <Header/>
    <Announcement type={"Upper half"}/>
    <Feature/>
    <Announcement type={"Lower half"}/>
    <Footer/>
    </div>
  )
}

export default Home