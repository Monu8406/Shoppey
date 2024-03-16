import React from 'react'
import "./NewsLetter.css"
export const NewsLetter = () => {
  return (
    <div  className='newsletter'>
  <h1>Get Exclusive Offer On Email </h1>

  <p>  Subscribe to your newsletter and stay update</p>

  <div>

    <input type="email" placeholder='your Email id' />
    <button>Subscribe</button>
  </div>
    </div>
  )
}
