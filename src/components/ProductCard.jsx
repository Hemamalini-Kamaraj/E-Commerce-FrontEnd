import { CurrencyRupee } from 'react-bootstrap-icons';
import AddToCart from './AddToCart';

function ProductCard({product}) {
    return (
        <div className="col-xxl-4 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
        <div className="card text-center rounded" style={{width:"400px", height:"410px"}}>
            <img className="card-img mx-auto mt-3" src={product.image} alt="Card image cap" style={{width:"200px", height:"200px"}} />
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>   
            </div>
            <div className='card-footer product-body'>
                <h3 style={{ marginTop: 10, color:"darkviolet" }}><CurrencyRupee />{product.price}</h3>
                <AddToCart product={product}/>
            </div>
        </div>
        </div>
    );
}

export default ProductCard;