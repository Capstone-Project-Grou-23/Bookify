import React, { useState, useEffect } from 'react';
import './BookList.css'; // Import the CSS file

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch books from your API endpoint
        fetch('http://localhost:5000/api/books') // Using the API endpoint from server/index.js
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
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div className="booklist-container"><p>Loading books...</p></div>;
    }

    if (error) {
        return <div className="booklist-container"><p>Error loading books: {error}</p></div>;
    }

    return (
        <div className="booklist-container">
            <h1>Available Books</h1>
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
                                <button className="add-to-cart-btn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No books currently available.</p>
            )}
        </div>
    );
};

export default BookList;
