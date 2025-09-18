CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  category_id INT,
  seller_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- Insert some sample categories
INSERT INTO categories (name) VALUES ('Fiction'), ('Science'), ('History'), ('Fantasy');

-- Insert some sample books
INSERT INTO books (title, author, price, description, image_url, category_id, seller_id) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 10.99, 'A novel about the American dream.', 'https://covers.openlibrary.org/b/id/8228691-L.jpg', 1, 1),
('1984', 'George Orwell', 8.99, 'A dystopian novel.', 'https://covers.openlibrary.org/b/id/10523331-L.jpg', 1, 1),
('A Brief History of Time', 'Stephen Hawking', 12.99, 'A popular-science book on cosmology.', 'https://covers.openlibrary.org/b/id/1007711-L.jpg', 2, 1),
('The Hobbit', 'J.R.R. Tolkien', 9.99, 'A fantasy novel.', 'https://covers.openlibrary.org/b/id/1003436-L.jpg', 4, 1);
