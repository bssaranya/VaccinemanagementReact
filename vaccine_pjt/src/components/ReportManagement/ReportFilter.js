import React, { useState } from 'react';

const ReportFilter = ({ filterSearch }) => {
  const [filter, setFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // function that passes the filtered value to parent as props
  const formSubmitt = (e) => {
    e.preventDefault();
    filterSearch(filter, filterValue);
  };

  return (
    <div>
      <form onSubmit={formSubmitt}>
        <div className="input-group mb-3">
          <select
            className="dropdown-toggle form-select"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Filter by</option>
            <option value="fullName">Name</option>
            <option value="phoneNumber">Phone Number</option>
            <option value="aadharNumber">Aadhar</option>
            <option value="gender">Gender</option>
          </select>
          {filter ? (
            filter === 'gender' ? (
              // if the filter is gender show the radio button
              <div className="form-check me-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  className="ms-2"
                  value="Female"
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                Female
              </div>
            ) : (
              // if filter is rather than gender show the text box
              <input
                type="text"
                className="form-control"
                placeholder="Enter the filter value.."
                onChange={(e) => setFilterValue(e.target.value)}
              />
            )
          ) : null}
          <button type="submit" className="btn btn-outline-secondary">
            Get Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportFilter;
