import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVaccinationDetail } from '../../actions';
import DataTable from 'react-data-table-component';

const VaccinationList = () => {
  const dispatch = useDispatch();
  const { vaccinesList } = useSelector((state) => state.vaccineReducer);

  useEffect(() => {
    dispatch(getVaccinationDetail());
  }, []);

  // set the colum for listing table
  const columns = [
    {
      name: 'Slno',
      selector: (row) => row.slno,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Addhar No:',
      selector: (row) => row.aadharNumber,
    },
    {
      name: 'Last Dosage',
      selector: (row) => row.dosage,
    },
    {
      name: 'Vaccine',
      selector: (row) => row.vaccine,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Scheduled Date',
      selector: (row) => row.scheduledDate,
    },
  ];

  // map data for set data
  const data = vaccinesList.map((item, index) => ({
    slno: index + 1,
    id: item.id,
    name: item.fullName,
    aadharNumber: item.aadharNumber,
    dosage: item.dosage,
    vaccine: item.vaccine,
    date: item.startDate,
    scheduledDate: item.scheduledDate,
  }));

  return (
    <div className="container">
      <>
        {/* heading */}
        <h2 className="text-uppercase text-center my-5">
          List of Vaccinated Persons
        </h2>

        {/* add button */}
        <div className="d-flex justify-content-end">
          <Link to="/vaccine-add">
            <button className="btn  add-btn">
              Register
              <i className="fa-solid fa-person-dress-burst text-white fs-4 ms-2"></i>
            </button>
          </Link>
        </div>
        <DataTable columns={columns} data={data} />
      </>
    </div>
  );
};

export default VaccinationList;
