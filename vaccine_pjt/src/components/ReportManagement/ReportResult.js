import React from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';

const ReportResult = ({ filteredData }) => {
  // columns for the table
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
  ];

  // map the data to corresponding columns
  const data = filteredData.map((item, index) => ({
    slno: index + 1,
    id: item.id,
    name: item.fullName,
    phone: item.phoneNumber,
    email: item.email,
    aadhar: item.aadharNumber,
    gender: item.gender,
  }));

  // set header for excel download
  const headers = [
    { label: ' Name', key: 'name' },
    { label: 'Phone', key: 'phone' },
    { label: 'Email', key: 'email' },
    { label: 'Aadhar', key: 'aadhar' },
    { label: 'Gender', key: 'gender' },
  ];

  // set data for excel download
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Report.csv',
  };

  return (
    <>
      <div className="d-flex justify-content-end ">
        <CSVLink {...csvReport}>
          <button className="btn  add-btn">
            Export <i className="fa-solid fa-download text-white fs-4"></i>
          </button>
        </CSVLink>
      </div>

      <DataTable columns={columns} data={data} />
    </>
  );
};

export default ReportResult;
