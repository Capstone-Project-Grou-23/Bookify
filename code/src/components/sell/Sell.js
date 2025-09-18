import React, { useState, useEffect } from 'react';
import './Sell.css';

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

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));

        // Assuming seller_id is 1 for now
        fetchBooks(1);
    }, []);

    const fetchBooks = (sellerId) => {
        fetch(`http://localhost:5000/books?seller_id=${sellerId}`)
            .then(response => response.json())
            .then(data => setSellerBooks(data))
            .catch(error => console.error('Error fetching seller books:', error));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            title,
            author,
            price,
            description,
            image_url: imageUrl,
            category_id: categoryId,
            seller_id: 1, // hardcoded for now
        };

        try {
            const response = await fetch('http://localhost:5000/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBook),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Book listed successfully!');
                fetchBooks(1); // Refresh seller books
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
        (acc[book.category_name] = acc[book.category_name] || []).push(book);
        return acc;
    }, {});


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
                {Object.keys(categorizedBooks).map(categoryName => (
                    <div key={categoryName} className="category-section">
                        <h3>{categoryName}</h3>
                        <div className="book-list">
                            {categorizedBooks[categoryName].map(book => (
                                <div className="book-card" key={book.id}>
                                    <img src={book.image_url} alt={book.title} />
                                    <h4>{book.title}</h4>
                                    <p>${book.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sell;
