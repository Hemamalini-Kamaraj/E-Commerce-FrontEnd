import { useDispatch, useSelector } from "react-redux";
import { addToCartRedux, removeFromCartRedux} from "../redux/reducers/cartReducer";

function AddToCart({ product }) {

  // const { cart, addToCart, removeFromCart } = useCartContext();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
    const productInCart = cart[product.id];
    
  const handleRemoveFromCart = () => {
      dispatch(removeFromCartRedux(product));
    };
    
  const handleAddToCart = () => {
      dispatch(addToCartRedux(product));
    };
    
  if (!productInCart) {
    return (
      <div className="add-to-cart" onClick={handleAddToCart}>
        Add To Cart{" "}
      </div>
    );
  } else {
    return (
      <div className="add-to-cart-container">
        <div className="add" onClick={handleRemoveFromCart}>
          -
        </div>
        <div className="add">{productInCart.quantity}</div>
        <div className="add" onClick={handleAddToCart}>
          +
        </div>
      </div>
    );
  }
}

export default AddToCart;
