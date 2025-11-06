import React, { useState, useEffect } from 'react';
import './Sell.css';
import { Link } from 'react-router-dom'; // Import Link

const Sell = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [sellerBooks, setSellerBooks] = useState([]);
    const [message, setMessage] = useState('');
    
    // Get the user from local storage to find the seller_id
    const user = JSON.parse(localStorage.getItem('user'));
    const sellerId = user ? user.id : null;
    const token = localStorage.getItem('token'); // Get the token

    useEffect(() => {
        // Fetch categories - This is a public route, no token needed
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`) // ✅ Corrected path
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));

        // Fetch the seller's books if they are logged in
        if (sellerId) {
            fetchBooks(sellerId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sellerId]); // Re-run if sellerId changes

    const fetchBooks = (currentSellerId) => {
        if (!token) return; // Don't fetch if no token
        
        // This endpoint requires authentication
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/books?seller_id=${currentSellerId}`, { // ✅ Corrected path
             headers: {
                // ✅ Add Authorization header
                'Authorization': `Bearer ${token}` 
             }
        })
       .then(res => res.json())
       .then(data => {
           if(!data.error) setSellerBooks(data);
        })
       .catch(error => console.error('Error fetching seller books:', error));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!token) { // Check for token
            setMessage('You must be logged in to sell a book.');
            return;
        }

        const newBook = {
            title,
            author,
            price,
            description,
            image_url: imageUrl,
            category_id: categoryId,
            // ❌ Removed hardcoded seller_id: 1
            // The server will get the seller_id from the token.
        };

        try {
            // ✅ Use the correct /api/books endpoint
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/books`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    // ✅ Add the Authorization header
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(newBook),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Book listed successfully!');
                if (sellerId) {
                    fetchBooks(sellerId); // Refresh seller books
                }
                // Clear form
                setTitle('');
                setAuthor('');
                setPrice('');
                setDescription('');
                setImageUrl('');
                setCategoryId('');

            } else {
                setMessage(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error(err);
            setMessage('Server error. Try again later.');
        }
    };

    const categorizedBooks = sellerBooks.reduce((acc, book) => {
        // Handle null or undefined category names
        const categoryName = book.category_name || 'Uncategorized';
        (acc[categoryName] = acc[categoryName] || []).push(book);
        return acc;
    }, {});

    // If user is not logged in, show a message
    if (!sellerId) {
        return (
            <div className="sell-container">
                <h1>Sell a Book</h1>
                <p>Please <Link to="/login">log in</Link> to sell your books.</p>
            </div>
        );
    }

    return (
        <div className="sell-container">
            <h1>Sell a Book</h1>
            <form onSubmit={handleSubmit} className="sell-form">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select a Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit">List Book</button>
            </form>
            {message && <p className="message">{message}</p>}

            <div className="seller-listings">
                <h2>Your Listings</h2>
                {sellerBooks.length === 0 ? (
                    <p>You have not listed any books yet.</p>
                ) : (
                    Object.keys(categorizedBooks).map(categoryName => (
                        <div key={categoryName} className="category-section">
                            <h3>{categoryName}</h3>
                            <div className="book-list">
                                {categorizedBooks[categoryName].map(book => (
                                    <div className="book-card" key={book.id}>
                                        <img src={book.image_url || 'https://via.placeholder.com/150/EEEEEE/808080?text=No+Image'} alt={book.title} />
                                        <h4>{book.title}</h4>
                                        <p>${book.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Sell;
