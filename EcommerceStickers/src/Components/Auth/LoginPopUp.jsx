import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';

/**
 * LoginPopUp component provides a modal for user login and registration.
 * It allows users to switch between login and registration forms,
 * handles form submission, and displays success or error messages.
 */

const LoginPopUp = ({ show, handleClose, onLoginSuccess }) => {
  const { login } = useAuth(); 
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    username: '', name: '', email: '', password: '', passwordConfirm: '',
    phone: '', address: ''
  });

  useEffect(() => {
    if (show) {
      setFormData({
        username: '',
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phone: '',
        address: ''
      });
      setError(null);
      setSuccess(null);
      setIsLogin(true);
    }
  }, [show]);

  const url = 'https://res.cloudinary.com/dxxpja0jo/image/upload/v1748548762/default-user_htxiic.png';
  
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:3000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        login(res.data.user, res.data.tokens.accessToken); 
        setSuccess('Logged in!');
        onLoginSuccess?.();
      } else {
        const data = new FormData();
        data.append('username', formData.username);
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('passwordConfirmation', formData.passwordConfirm);
        data.append('phone', formData.phone);
        data.append('address', formData.address);
        data.append('role', 'user');
        data.append('companyName', 'N/A');

        const response = await fetch(url);
        const imageBlob = await response.blob();

        const defaultImage = new File([imageBlob], 'default-user.png', { type: 'image/png' });
        data.append('image', new File([defaultImage], 'default-user.png', { type: 'image/png' }));

        await axios.post('http://localhost:3000/api/auth/register', data);
        setSuccess('Account created successfully! You can now log in.');
        setIsLogin(true);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Log In' : 'Sign Up'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Form.Group className="mb-2 custom-input-group">
                <Form.Label>Username</Form.Label>
                <Form.Control className='custom-input' name="username" value={formData.username} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2 custom-input-group">
                <Form.Label>Name</Form.Label>
                <Form.Control className='custom-input' name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-2 custom-input-group">
            <Form.Label>Email</Form.Label>
            <Form.Control className='custom-input' type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2 custom-input-group">
            <Form.Label>Password</Form.Label>
            <Form.Control className='custom-input' type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>

          {!isLogin && (
            <>
              <Form.Group className="mb-2 custom-input-group">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control className='custom-input' type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2 custom-input-group">
                <Form.Label>Phone</Form.Label>
                <Form.Control className='custom-input' name="phone" value={formData.phone} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2 custom-input-group">
                <Form.Label>Address</Form.Label>
                <Form.Control className='custom-input' name="address" value={formData.address} onChange={handleChange} required />
              </Form.Group>
            </>
          )}

          <div className="text-end mt-3">
            <Button variant="secondary" onClick={() => {
                handleClose();
              }} className="me-2">
                Cancel
            </Button>
            <Button type="submit" className='custom-main-button custom-button' variant="primary" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : isLogin ? 'Login' : 'Register'}
            </Button>
          </div>
        </Form>

        <div className="text-center mt-3">
          <small>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <Button variant="link" size="sm" style={{ color: 'hotpink' }}  onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </Button>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginPopUp;
