import { useEffect, useState } from "react";
import Product from "./ProductCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Spinner from 'react-bootstrap/Spinner';

const ProductList = ({ selectedCategory, setSelectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if (selectedCategory.length > 0) {
      setLoading(true)
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((json) => {
          setProducts(json);
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  let loadError = null;

  if (loading) {
    return (
      <>
        <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="container text-center align-itmes-center mt-5 p-5 vh-100">
            <Spinner animation="border" role="status" className="fs-1">
                <span className="visually-hidden text-center">Loading...</span>
          </Spinner>
        </div>
        <Footer />  
      </>
    );
  } else if (loadError) {
    return <div>Please try again ... </div>;
  } else {
      return (
        <>
          <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <h3 className="text-center mt-4 fw-bold"style={{color:"darkviolet"}}>{selectedCategory.toUpperCase() }</h3>
          <div className="container justify-content-center">
            <div className="products row card-group d-flex">
                {products.map((product) => (
                  <Product product={product} key={product.title}/>
                ))}
              </div>
          </div>
          <Footer />
          </>
    );
  }
};
export default ProductList;
