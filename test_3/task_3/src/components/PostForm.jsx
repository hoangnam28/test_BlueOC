import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/post';
import { Form, Button, Container, Toast, Row, Col } from 'react-bootstrap';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

   
    if (!title || !body) {
      setError('Please fill in both title and body fields.');
      setShowToast(true); // Show toast for error
      return;
    }

    
    dispatch(addPost({ title, body }));

  
    setTitle('');
    setBody('');

    
    setSuccessMessage('Post added successfully!');
    setShowToast(true); 
  };

  return (
    <Container className="mt-4">
      <h2>Add New Post</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={!title && error}
          />
          {!title && error && (
            <Form.Control.Feedback type="invalid">
              Title is required.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter post content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            isInvalid={!body && error}
          />
          {!body && error && (
            <Form.Control.Feedback type="invalid">
              Body is required.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Post
        </Button>
      </Form>

      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            className="position-fixed bottom-0 end-0 m-3"
          >
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body>
              {error ? error : successMessage}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
};

export default PostForm;
