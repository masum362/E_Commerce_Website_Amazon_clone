import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import './home.css'
import Slide from './Slide'
import './slide.css'
import { useDispatch, useSelector } from 'react-redux'
import getProducts from '../redux/actions/Actions'
import { ScaleLoader } from 'react-spinners'

const Maincom = () => {

  const { products } = useSelector(state => state.productsR)
  console.log(products)
  console.log(products.length)

  const [isloading, setIsloading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts())
    setTimeout(() => {
      setIsloading(true);
    }, 1000);
  }, [dispatch])






  return (
    <div className='home_section'>
      {isloading && <div>
        <div className='banner_part'>
          <Banner />
        </div>
        <div className="slide_part">
          <div className="left_slide">
            <Slide title="Deal Of The Day" products={products}  />
          </div>
          <div className="right_slide">
            <h4>Festive latest launches</h4>
            <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_D2_45M_en_US_1x._CB418309979_.jpg" alt="" />
            <a href="#">See More</a>
          </div>

        </div>
        <Slide title="Today's Deal" products={products}  />
        <div className="center_img">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonSmallBusinessDay/PrivateBrands/GW20/PB_OfficeFurniture_QV_1500x300_indas.jpg" alt="" />
        </div>
        <Slide title="Beauty picks" products={products}/>
        <Slide title="Trending Now" products={products}/>
        <Slide title="Spring new arrivals" products={products}/>
      </div>}

      {!isloading && <ScaleLoader

        color={"#000"}
        size={150}
        style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
        aria-label="Loading Spinner"
        data-testid="loader" />}
    </div>
  )
}

export default Maincom