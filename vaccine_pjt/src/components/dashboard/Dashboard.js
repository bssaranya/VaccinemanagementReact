import React, { useEffect } from 'react';
import CounterCard from './CounterCard';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData, getVaccinationDetail } from '../../actions';

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;
const Dashboard = () => {
  const { personsList, vaccinesList } = useSelector(
    (state) => state.vaccineReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getVaccinationDetail());
  }, []);

  // calculate the count
  let vaccinated = vaccinesList.length;
  let registered = personsList.length;
  let notVaccinated = registered - vaccinated;

  return (
    <Cards className="container-bg">
      <>
        <CounterCard
          iconClass="fa-solid fa-address-card"
          heading="No. of Person Registered"
          count={registered}
        />

        <CounterCard
          iconClass="fa-solid fa-syringe"
          heading="No. of Person Vaccinated"
          count={vaccinated}
        />

        <CounterCard
          iconClass="fa-solid fa-virus-slash"
          heading="No. of Person Not Vaccinated"
          count={notVaccinated}
        />
      </>
    </Cards>
  );
};

export default Dashboard;
