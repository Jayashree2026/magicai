import React, { useEffect } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Layout from "./pages/Layout"
import Writearticle from "./pages/Writearticle"
import BlogTokens from "./pages/BlogTokens"
import Generatedimage from "./pages/Generatedimage"
import Removeobject from "./pages/Removeobject"
import RemovedBg from "./pages/RemovedBg"
import Reviewresume from "./pages/Reviewresume"
import Community from "./pages/Community"
import {Toaster} from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react'

const App = () => {

  const {getToken}=useAuth()
  useEffect(()=>{
    getToken().then((token)=>console.log(token));
  },[])
  
  return (
    <div>
      <Toaster/>
      <Routes>
        
        <Route path="/" element={<Home />} />

      
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<Writearticle />} />
          <Route path="blog-titles" element={<BlogTokens />} />
          <Route path="generate-images" element={<Generatedimage />} />
          <Route path="remove-object" element={<Removeobject />} />
          <Route path="remove-background" element={<RemovedBg />} />
          <Route path="review-resume" element={<Reviewresume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
