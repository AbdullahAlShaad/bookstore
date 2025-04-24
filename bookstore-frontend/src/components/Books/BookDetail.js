import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookByISBN } from '../../services/api';

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await getBookByISBN(isbn);
        console.log('Book detail response:', response.data);
        setBook(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch book details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [isbn]);

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-detail">
      <h2>{book.book_name}</h2>
      <div className="book-info">
        <p><strong>Author:</strong> {book.author_info?.name || 'Unknown'}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        
        {book.author_info?.date_of_birth && (
          <p><strong>Author's Birth Date:</strong> {book.author_info.date_of_birth}</p>
        )}
        
        {book.author_info?.birth_place && (
          <p><strong>Author's Birth Place:</strong> {book.author_info.birth_place}</p>
        )}
      </div>
      
      <div className="book-actions">
        <Link to="/books">Back to Books</Link>
      </div>
    </div>
  );
};

export default BookDetail;