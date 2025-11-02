import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AI_tools from '../components/AI_tools'
import Testimonials from '../components/Testimonials'
import Plan from '../components/Plan'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <AI_tools/>
      <Testimonials/>
      <Plan/>
      <Footer/>
    </>
  )
}

export default Home
