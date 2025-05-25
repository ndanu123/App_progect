import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function BookForm({ onAddBook, editingBook, onUpdateBook, onCancelEdit }) {
  // State for form fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');

  // Update form fields when editingBook changes
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setGenre(editingBook.genre);
      setImage(editingBook.image);
    } else {
      // Reset form when not editing
      setTitle('');
      setAuthor('');
      setGenre('');
      setImage('');
    }
  }, [editingBook]);

  function handleSubmit(e) {
    e.preventDefault();

    const bookData = { title, author, genre, image };

    if (editingBook) {
      // Update existing book
      fetch(`http://localhost:3000/books/${editingBook.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(bookData)
      })
        .then(res => res.json())
        .then(updatedBook => {
          onUpdateBook(updatedBook);
          resetForm();
        })
        .catch(err => console.error("Error updating book!", err));
    } else {
      // Add new book
      fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(bookData)
      })
        .then(res => res.json())
        .then(newBook => {
          onAddBook(newBook);
          resetForm();
        })
        .catch(err => console.error("Error adding book!", err));
    }
  }

  function resetForm() {
    setTitle('');
    setAuthor('');
    setGenre('');
    setImage('');
  }

  return (
    <div>
      <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Book Title input */}
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Book Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required
          />
        </Form.Group>

        {/* Author input */}
        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Book Author</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Author" 
            value={author} 
            onChange={e => setAuthor(e.target.value)} 
            required
          />
        </Form.Group>
        
        {/* Genre input */}
        <Form.Group className="mb-3" controlId="formGenre">
          <Form.Label>Book Genre</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Genre" 
            value={genre} 
            onChange={e => setGenre(e.target.value)} 
            required
          />
        </Form.Group>

        {/* Image URL input */}
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Book Cover Image URL</Form.Label>
          <Form.Control 
            type="url" 
            placeholder="Enter Image URL" 
            value={image} 
            onChange={e => setImage(e.target.value)} 
          />
          {image && (
            <div className="mt-2">
              <small>Preview:</small>
              <img 
                src={image} 
                alt="Book cover preview" 
                className="img-thumbnail mt-1" 
                style={{ maxWidth: '100px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                }}
              />
            </div>
          )}
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">
            {editingBook ? 'Update Book' : 'Add Book'}
          </Button>
          
          {editingBook && (
            <Button 
              variant="secondary" 
              type="button"
              onClick={onCancelEdit}
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default BookForm;