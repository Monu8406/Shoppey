import React from 'react'
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from "../Assets/arrow.png";
import hero_img from '../Assets/hero_image.png';
export const Hero = () => {
  return (
    <div  className='hero'>
        <div className='hero-left'>
         
          <div>
          
          <div className="hero-hand-icon">
           <img src={hand_icon} alt="This"/>
     
     </div>
     
     <p>New </p>
      <p>Collections</p>
      <p>For Everyone</p>
      </div>
      <div className="hero-latest-btn">
      <div>LATEST COLECTION</div>
      <img src={arrow_icon} alt="" />
      </div>
      </div>
  
    <div className='hero-right'>
      <img src={hero_img} alt="" />

    </div>

    </div>








  )
}
