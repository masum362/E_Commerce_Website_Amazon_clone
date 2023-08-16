import React from 'react'
// import './slide.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { NavLink } from 'react-router-dom';
// import { products } from './productdata.js';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const Slide = ({ title,products }) => {
  

  return (
    <div className='products_section'>
      <div className='products_deal'>
        <h3>{title}</h3>
        <button className='view_btn'>View All</button>
      </div>
      <hr />
      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={true}
        swipeable={true}
        showDots={false}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass='carousel-container'
      >
        {products.map(product => {
          return (
           <NavLink to={`/singleproduct/${product._id}`} >
             <div className="products_items" key={product._id}>
              <div className='product_img'>
                <img src={product.url} alt="" />
              </div>
              <p className='product_name'>{product.title.shortTitle}</p>
              <p className='product_offer'>{product.discount}</p>
              <p className='product_explore'>{product.tagline}</p>
            </div>
           </NavLink>
          )
        })}
      </Carousel>
    </div>
  )
}

export default Slide