import { createContext, useContext, useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TOTAL_ITEMS':
      if (!action.payload || !Array.isArray(action.payload.items)) return 0;
      return action.payload.items.reduce((sum, item) => sum + item.totalProductQuantity, 0);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, dispatch] = useReducer(cartReducer, 0);

  const fetchCart = async () => {
  if (!user) {
    setCart([]);
    dispatch({ type: 'UPDATE_TOTAL_ITEMS', payload: { items: [] } }); // <- important
    return;
  }
  setLoading(true);
  try {
    const res = await axios.get('http://localhost:3000/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart(res.data.cart);
    dispatch({ type: 'UPDATE_TOTAL_ITEMS', payload: res.data.cart });
  } catch (err) {
    console.error('Error fetching cart:', err);
    setCart([]);
    dispatch({ type: 'UPDATE_TOTAL_ITEMS', payload: { items: [] } }); // <- en cas d’erreur
  } finally {
    setLoading(false);
  }
};


  const addToCart = async (productId, quantity, selectedColor, selectedSize) => {
    if (!user) return false; // utilisé pour déclencher la pop-up
    try {
      await axios.post('http://localhost:3000/api/cart', { productId, quantity, selectedColor, selectedSize }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
      return true;
    } catch (err) {
      console.error('Add to cart failed:', err);
      return false;
    }
  };

  const increaseOne = async (productId, selectedColor, selectedSize) => {
  try {
    await axios.patch('http://localhost:3000/api/cart/increase-one', {
      productId,
      selectedColor: selectedColor?._id || selectedColor,
      selectedSize: selectedSize?._id || selectedSize
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  } catch (err) {
    console.error('Increase one failed:', err);
  }
};

  const reduceOne = async (productId, selectedColor, selectedSize) => {
    
    console.log('REDUCE, product, color, size, token', productId, selectedColor, selectedSize, token);
  try {
    await axios.patch('http://localhost:3000/api/cart/reduce-one', {
      productId,
      selectedColor: selectedColor?._id || selectedColor,
      selectedSize: selectedSize?._id || selectedSize
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  } catch (err) {
    console.error('Reduce one failed:', err);
  }
};

  const removeItem = async (productId, selectedColor, selectedSize) => {
  console.log('DELETE, product, color, size, token', productId, selectedColor, selectedSize, token);
  try {
    await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        selectedColor: selectedColor?._id || selectedColor,
        selectedSize: selectedSize?._id || selectedSize
      }
    });
    fetchCart();
  } catch (err) {
    console.error('Delete product failed:', err);
  }
};

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, increaseOne, reduceOne, removeItem, fetchCart, totalItems  }}>
      {children}
    </CartContext.Provider>
  );
};
