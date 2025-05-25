import React from 'react';
import BookForm from '../components/BookForm';
import { useState, useEffect } from 'react';

function Library() {
    const [books, setBooks] = useState(null);
    const [editingBook, setEditingBook] = useState(null); // Add this state

    useEffect(() => {
        fetch('http://localhost:3000/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
            });
    }, []);

    function handleDelete(id) {
        const isConfirmed = window.confirm('Are you sure you want to delete this book?');
        
        if (!isConfirmed) return;

        fetch(`http://localhost:3000/books/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setBooks(books.filter((book) => book.id !== id));
            alert('Book deleted successfully!');
        })
        .catch(error => {
            console.error('Error deleting book:', error);
            alert('Failed to delete book. Please try again.');
        });
    }

    function handleEdit(book) {
        setEditingBook(book);
    }

    function handleAddBook(newBook) {
        setBooks([...books, newBook]);
    }

    function handleUpdateBook(updatedBook) {
        setBooks(books.map(book => 
            book.id === updatedBook.id ? updatedBook : book
        ));
        setEditingBook(null);
    }

    function handleCancelEdit() {
        setEditingBook(null);
    }

    return (
        <div className="container mt-5">
            <BookForm 
                onAddBook={handleAddBook}
                editingBook={editingBook}
                onUpdateBook={handleUpdateBook}
                onCancelEdit={handleCancelEdit}
            />

            <h2 className="my-4">Books</h2>

            {books ? (
                <div className="row">
                    {books.map(book => (
                        <div key={book.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow">
                                <img 
                                    src={book.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                                    alt={book.title} 
                                    className="card-img-top" 
                                    style={{ height: '200px', objectFit: 'cover' }} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                                    <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
                                </div>
                                <div className="card-footer bg-white border-top-0">
                                    <button 
                                        className="btn btn-danger w-100 mb-2"
                                        onClick={() => handleDelete(book.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-secondary w-100"
                                        onClick={() => handleEdit(book)}
                                    >
                                        Edit
                                    </button>    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading books...</p>
            )}
        </div>
    );
}

export default Library;