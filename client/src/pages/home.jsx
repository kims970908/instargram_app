import React from 'react'
import Posts from '../components/home/Posts'
import Status from '../components/home/Status'

const Home = () => {
  return (
    <div className="home row mx-0">
      <Status />
      <Posts />
    </div>
  )
}

export default Home