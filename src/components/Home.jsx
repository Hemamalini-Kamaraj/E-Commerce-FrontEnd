import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import Navbar from "./Navbar"
import Footer from "./Footer"

function Home({ selectedCategory, setSelectedCategory }) {
  return (
    <div className='d-flex flex-column'>
      <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className='container-fluid mt-4 min-vh-100'>
        <div>
          <Link to='/signin'>
            <img src='https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Aug23ART/T2_AugART23_PC_Banner_NTA.jpg' className='img-fluid'></img>
          </Link>
        </div><br />
        <div>
          <h3 className='text-center fw-bold mb-4' style={{color:"black "}}>Stay tuned for the below offers!</h3>
          <img src='https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Aug23ART/Header/CENTRAL_PC_Header_T2_v2.jpg' className='img-fluid'></img>
        </div>
        {/* <ProductList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/> */}
      </div>
      <Footer />
    </div>
  )
}

export default Home