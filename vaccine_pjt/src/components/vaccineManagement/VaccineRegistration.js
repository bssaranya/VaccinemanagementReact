import React, { useState, useEffect } from 'react';
import VaccineFilter from './VaccineFilter';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserData,
  setVaccinationDetail,
  editVaccineData,
} from '../../actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const VaccineRegistration = () => {
  const dispatch = useDispatch();

  const { personsList, vaccinesList } = useSelector(
    (state) => state.vaccineReducer
  );

  // states for store form data
  const [userData, setUserData] = useState('');
  const [dosage, setDosage] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [scheduledDate, setScheduledDate] = useState(new Date());

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  // conver the date to dd/mm/yy format
  const dateFormat = (date) => {
    let d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return d;
  };

  // function for search aadharNumber
  const searchByAadhar = (searchedAadhar) => {
    setUserData(
      personsList.find((item) => item.aadharNumber === searchedAadhar)
    );
  };

  // form submit
  const formSubmit = (e) => {
    e.preventDefault();
    let value = {
      fullName: userData.fullName,
      aadharNumber: userData.aadharNumber,
      dosage,
      vaccine,
      startDate,
      scheduledDate,
    };
    let isExist = vaccinesList.find(
      (user) => user.aadharNumber === userData.aadharNumber
    );
    if (isExist) {
      dispatch(editVaccineData(isExist.id, value));
    } else {
      dispatch(setVaccinationDetail(value));
    }
  };

  return (
    <div className="container-bg">
      <>
        <div className="form-container">
          <h2 className="text-uppercase text-center mb-5">
            Vaccine Registration
          </h2>
          <VaccineFilter filterSearch={searchByAadhar} />
          {/* form */}
          {userData ? (
            <form onSubmit={formSubmit} className="mb-4">
              {/* image */}
              <img src={userData.image} width="100px" height="100px" />

              {/* full name */}
              <div className="mb-4 mt-2">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={userData.fullName}
                  readOnly
                />
              </div>

              {/* phone number */}
              <div className="mb-4">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.phoneNumber}
                  readOnly
                />
              </div>

              {/* dosage */}
              <div className="mb-4">
                <label>Choose the dosage</label>
                <select
                  className="form-select"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                >
                  <option>Choose dosage</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              {/* vaccine name */}
              <div className="mb-4">
                <label className="form-label">Vaccine Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={vaccine}
                  onChange={(e) => setVaccine(e.target.value.trim())}
                />
              </div>

              {/* date */}
              <div className="mb-4">
                <label>Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(dateFormat(date))}
                  minDate={new Date()}
                  maxDate={new Date()}
                  className="form-control"
                />
              </div>

              {/* schedule date */}
              <div className="mb-4">
                <label>Next Schedule</label>
                <DatePicker
                  selected={scheduledDate}
                  onChange={(date) => setScheduledDate(dateFormat(date))}
                  minDate={new Date()}
                  className="form-control"
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn button">
                  Register
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </>
    </div>
  );
};

export default VaccineRegistration;
