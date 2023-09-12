const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

const addToCartRedux = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

const removeFromCartRedux = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});

const clearCartRedux = () => ({
  type: CLEAR_CART,
});

const initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newCart = { ...state };
      if (state[action.payload.id]) {
        const newProduct = { ...state[action.payload.id] };
        newProduct.quantity = newProduct.quantity + 1;
        newCart[action.payload.id] = newProduct;
      } else {
        newCart[action.payload.id] = {
          id: action.payload.id,
          quantity: 1,
          title: action.payload.title,
          image: action.payload.image,
          price: action.payload.price,
        };
      }
      return newCart;
    }
    case "REMOVE_FROM_CART": {
      const newCart = { ...state };
      if (!newCart[action.payload.id]) return state;

      if (newCart[action.payload.id].quantity === 1) {
        delete newCart[action.payload.id];
      } else {
        const newProduct = { ...state[action.payload.id] };
        newProduct.quantity -= 1;
        newCart[action.payload.id] = newProduct;
      }
      return newCart;
    }
    case "CLEAR_CART":
      return state;
    default:
      return state;
  }
};

export { addToCartRedux, removeFromCartRedux, clearCartRedux };
export default cartReducer;
