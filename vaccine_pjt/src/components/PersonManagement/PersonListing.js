import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../actions';
import DataTable from 'react-data-table-component';

const PersonListing = () => {
  const dispatch = useDispatch();
  const { personsList } = useSelector((state) => state.vaccineReducer);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  // set the colum for listing table
  const columns = [
    {
      name: 'Slno',
      selector: (row) => row.slno,
    },
    {
      name: 'Photo',
      selector: (row) => <img src={row.photo} width="100px" height="100px" />,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Phone No:',
      selector: (row) => row.phone,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Aadhar',
      selector: (row) => row.aadhar,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
    },
    {
      name: 'Action',
      selector: (row) => (
        <Link
          className="btn btn-outline-info m-2"
          to={`/person-edit/${row.id}`}
        >
          Edit
        </Link>
      ),
    },
  ];

  // map data for set data
  const data = personsList.map((item, index) => ({
    slno: index + 1,
    id: item.id,
    name: item.fullName,
    phone: item.phoneNumber,
    email: item.email,
    aadhar: item.aadharNumber,
    gender: item.gender,
    photo: item.image,
  }));

  return (
    <div className="container">
      <>
        {/* heading */}
        <h2 className="text-uppercase text-center my-5">
          List of Registered Users
        </h2>

        {/* add button */}
        <div className="d-flex justify-content-end">
          <Link to="/person-add">
            <button
              className="btn add-btn"
              onClick={() => dispatch({ type: 'RESET_PERSON_DETAIL_BY_ID' })}
            >
              Add <i className="fa-solid fa-user-plus text-white fs-4"></i>
            </button>
          </Link>
        </div>

        {/* data table */}
        <DataTable columns={columns} data={data} />
      </>
    </div>
  );
};

export default PersonListing;
