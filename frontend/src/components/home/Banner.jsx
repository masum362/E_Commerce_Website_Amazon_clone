import React from 'react';
import './banner.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'
import banner5 from '../../assets/banner5.jpg'


const Banner = () => {
  const data = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5
  ]
  return (
    <div >
      <Carousel
        infiniteLoop
        autoPlay
        interval={1000}
        stopOnHover
        showThumbs={false}
        showStatus={false}
      >

        {data.map(img => {
          return (
            <div key={new Date().getTime() * Math.random() * 1000}>
              <img src={img} alt='banner' className="banner_img" />
            </div>

          )
        })}

      </Carousel>
    </div>
  )
}

export default Banner