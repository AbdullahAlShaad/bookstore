import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookByName } from '../../services/api';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setSearched(true);
      const response = await getBookByName(searchTerm);
      console.log('Search response:', response.data);
      
      // Handle both array and single object responses
      const books = Array.isArray(response.data) 
        ? response.data 
        : response.data ? [response.data] : [];
      
      setSearchResults(books);
      setError('');
    } catch (err) {
      setError('No books found matching your search');
      setSearchResults([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-search">
      <h2>Search Books</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="search">Book Title:</label>
          <div className="search-input-group">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter book title"
            />
            <button type="submit">Search</button>
          </div>
        </div>
      </form>
      
      {loading && <div>Searching...</div>}
      {error && <div className="error">{error}</div>}
      
      {searched && !loading && !error && (
        <div className="search-results">
          <h3>Search Results</h3>
          
          {searchResults.length === 0 ? (
            <p>No books found matching "{searchTerm}"</p>
          ) : (
            <ul className="books-grid">
              {searchResults.map((book, index) => (
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
      )}
      
      <div className="back-link">
        <Link to="/books">Back to All Books</Link>
      </div>
    </div>
  );
};

export default BookSearch;