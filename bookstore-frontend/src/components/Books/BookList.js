import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getAllBooks();
      
      console.log('API Response:', response.data);
      
      // Convert object of books to array
      let booksData = [];
      if (response.data && typeof response.data === 'object') {
        booksData = Object.values(response.data); // This converts the object to an array
      }
      
      console.log('Converted books array:', booksData);
      setBooks(booksData);
      setError('');
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="book-list">
      <h2>All Books</h2>
      
      <div className="search-options">
        <Link to="/books/search">Search Books</Link>
      </div>
      
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul className="books-grid">
          {books.map((book, index) => (
            <li key={book.isbn || index} className="book-card">
              <h3>{book.book_name}</h3>
              <p>By: {book.author_info?.name || 'Unknown Author'}</p>
              <p>ISBN: {book.isbn || 'N/A'}</p>
              <p>Genre: {book.genre || 'N/A'}</p>
              <p>Publisher: {book.publisher || 'N/A'}</p>
              <div className="book-actions">
                <Link to={`/books/${book.isbn}`}>View Details</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;