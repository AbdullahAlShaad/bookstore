import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import BookList from './components/Books/BookList';
import BookDetail from './components/Books/BookDetail';
import BookSearch from './components/Books/BookSearch';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Bookstore App</h1>
          <nav>
            <ul>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/books/search">Search</Link></li>
            </ul>
          </nav>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/search" element={<BookSearch />} />
            <Route path="/books/:isbn" element={<BookDetail />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Bookstore App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;