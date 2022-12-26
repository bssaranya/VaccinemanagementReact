import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { passwordChange } from '../actions';

const ChangePassword = () => {
  // states for save field values
  const [oldPswd, setOldPswd] = useState('');
  const [newPswd, setNewPswd] = useState('');

  const dispatch = useDispatch();

  // form submission
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordChange({ oldPswd, newPswd }));
    setNewPswd('');
    setOldPswd('');
  };

  return (
    <div className="container-bg">
      <>
        <div className="form-container">
          <h2 className="text-uppercase text-center mb-5">Change Password</h2>

          <form onSubmit={formSubmit}>
            {/* current password */}
            <div className="mb-4">
              <label>Current Password</label>
              <input
                type="password"
                className="form-control"
                value={oldPswd}
                onChange={(e) => setOldPswd(e.target.value)}
              />
            </div>

            {/* new password */}
            <div className="mb-4">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPswd}
                onChange={(e) => setNewPswd(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn button">
                Change
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default ChangePassword;
