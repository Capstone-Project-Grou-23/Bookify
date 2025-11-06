import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BookList.css';
import { useCart } from '../../context/CartContext'; // 1. ADD THIS IMPORT

// Helper function to get URL query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart(); // 2. This line (around 18) needs the import

    const query = useQuery();
    const location = useLocation();
    const searchTerm = query.get('search'); // Get 'search' from URL (e.g., /search?search=harry)

    useEffect(() => {
        // Build the API URL based on whether a search term exists
        let apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/books`;
        if (searchTerm) {
            // This is the line we fixed to only search titles
            apiUrl += `?search=${encodeURIComponent(searchTerm)}`;
        }

        setLoading(true);
        setError(null);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [searchTerm, location.pathname]); // Re-run this effect if the search term or path changes

    if (loading) {
        return <div className="booklist-container"><p>Loading books...</p></div>;
    }

    if (error) {
        return <div className="booklist-container"><p>Error loading books: {error}</p></div>;
    }

    return (
        <div className="booklist-container">
            {/* Show a dynamic title */}
            <h1>{searchTerm ? `Results for "${searchTerm}"` : 'Available Books'}</h1>
            
            {books.length > 0 ? (
                <div className="books-grid">
                    {books.map(book => (
                        <div className="book-card-item" key={book.id}>
                            <img src={book.image_url || 'https://via.placeholder.com/150/EEEEEE/808080?text=No+Image'} alt={`Cover of ${book.title}`} className="book-cover" />
                            <div className="book-details">
                                <h2 className="book-title">{book.title}</h2>
                                <p className="book-author">by {book.author}</p>
                                <p className="book-price">${book.price ? parseFloat(book.price).toFixed(2) : 'N/A'}</p>
                                <p className="book-category">Category: {book.category_name || 'Uncategorized'}</p>
                                <p className="book-seller">Seller: {book.seller_name || 'Unknown'}</p>
                                {/* 3. Add onClick event */}
                                <button className="add-to-cart-btn" onClick={() => addToCart(book)}>
                                  Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Show a helpful message if no books are found
                <p>{searchTerm ? 'No books found matching your search.' : 'No books currently available.'}</p>
            )}
        </div>
    );
};

export default BookList;
