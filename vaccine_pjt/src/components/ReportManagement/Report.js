import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../actions';
import ReportFilter from './ReportFilter';
import ReportResult from './ReportResult';

const Report = () => {
  const dispatch = useDispatch();
  const { personsList } = useSelector((state) => state.vaccineReducer);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  // get the filter type and filter data from child through props
  const filterDatas = (filterSelect, filterValue) => {
    let value = personsList.filter((item) => {
      return item[filterSelect] === filterValue;
    });
    setFilteredData(value);
  };

  return (
    <div className="container-bg">
      <>
        <div className="form-container">
          <h2 className="text-uppercase text-center mb-5">
            Vaccine Registration
          </h2>
          <ReportFilter filterSearch={filterDatas} />
          <ReportResult filteredData={filteredData} />
        </div>
      </>
    </div>
  );
};

export default Report;
