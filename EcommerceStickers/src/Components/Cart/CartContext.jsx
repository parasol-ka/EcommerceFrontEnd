import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.cartItems);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    if (!user) return false; // utilisé pour déclencher la pop-up
    try {
      await axios.post('http://localhost:3000/api/cart', { productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
      return true;
    } catch (err) {
      console.error('Add to cart failed:', err);
      return false;
    }
  };

  const increaseOne = async (productId) => {
    await axios.patch('http://localhost:3000/api/cart/increase-one', { productId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const reduceOne = async (productId) => {
    await axios.patch('http://localhost:3000/api/cart/reduce-one', { productId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const removeItem = async (productId) => {
    await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const clearCart = async () => {
    await axios.delete('http://localhost:3000/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, increaseOne, reduceOne, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
