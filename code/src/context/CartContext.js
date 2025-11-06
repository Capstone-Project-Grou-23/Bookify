import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Create a custom hook to use the cart context easily
export const useCart = () => {
  return useContext(CartContext);
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart from localStorage", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add a book to the cart
  const addToCart = (book) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        // If it is, increase quantity
        return prevItems.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it's not, add it with quantity 1
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  // Function to remove a book from the cart
  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  // Function to update item quantity
  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(bookId); // Remove if quantity is less than 1
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === bookId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  // ✅ NEW: Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Get total item count
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Value provided to all components
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    itemCount,
    clearCart // ✅ NEW: Expose the clearCart function
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
