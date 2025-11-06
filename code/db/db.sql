-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS `email_otps`, `wishlist`, `order_items`, `orders`, `books`, `categories`, `user_settings`, `users`;

-- Users table with additional profile information
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `profile_picture` VARCHAR(255) DEFAULT 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
  `bio` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- 2FA Columns
  `two_factor_secret` VARCHAR(255) DEFAULT NULL, -- For authenticator app
  `two_factor_enabled` BOOLEAN DEFAULT false,
  `two_factor_method` VARCHAR(10) DEFAULT 'NONE' -- 'NONE', 'APP', 'EMAIL'
);

-- ✅ NEW: Table for Email OTPs
CREATE TABLE `email_otps` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `otp_code` VARCHAR(10) NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);


-- User settings table
CREATE TABLE `user_settings` (
  `user_id` INT PRIMARY KEY,
  `theme` VARCHAR(20) DEFAULT 'light',
  `newsletter_subscribed` BOOLEAN DEFAULT true,
  `promotional_emails` BOOLEAN DEFAULT false,
  `activity_alerts` BOOLEAN DEFAULT true,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Categories for books
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE
);

-- Books table
CREATE TABLE `books` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `description` TEXT,
  `image_url` VARCHAR(255),
  `category_id` INT,
  `seller_id` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`),
  FOREIGN KEY (`seller_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Wishlist table
CREATE TABLE `wishlist` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT,
  `book_id` INT,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Order items table (to link books to orders)
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT,
  `book_id` INT,
  `quantity` INT DEFAULT 1,
  `price` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`book_id`) REFERENCES `books`(`id`)
);

-- Insert some sample categories
INSERT INTO `categories` (name) VALUES ('Fiction'), ('Science'), ('History'), ('Fantasy'), ('Comics'), ('Textbooks');
