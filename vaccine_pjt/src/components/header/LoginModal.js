import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { islogin } from '../../actions';

const LoginModal = ({ handleClose, show }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // form submit
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(islogin({ userName, password }));
    setUserName('');
    setPassword('');
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        // size="sm"
      >
        <Modal.Body className="text-center m-3">
          <Modal.Title>Login</Modal.Title>
          <form onSubmit={formSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>

            <Button variant="success" type="submit" className="mx-3">
              Login
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LoginModal;
