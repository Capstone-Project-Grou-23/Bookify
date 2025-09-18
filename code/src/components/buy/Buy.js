import React, { useState, useEffect } from 'react';
import './Buy.css';

const Buy = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));

        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const filteredBooks = selectedCategory === 'All'
        ? books
        : books.filter(book => book.category_name === selectedCategory);

    return (
        <div className="buy-container">
            <h1>Buy Books</h1>
            <div className="filter-container">
                <label>Filter by category:</label>
                <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                    <option value="All">All</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="book-list">
                {filteredBooks.map(book => (
                    <div className="book-card" key={book.id}>
                        <img src={book.image_url} alt={book.title} />
                        <h2>{book.title}</h2>
                        <p>by {book.author}</p>
                        <p className="price">${book.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Buy;
