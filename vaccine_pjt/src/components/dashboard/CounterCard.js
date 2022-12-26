import React from 'react';
import styled from 'styled-components';

const Counter = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 15px;
  display: flex;
`;
const Icon = styled.i`
  color: white;
  padding: 1.3rem;
  border-radius: 50%;
  background: linear-gradient(to left, #e96443, #904e95);
  font-size: larger;
`;
const CounterCard = ({ iconClass, heading, count }) => {
  return (
    <Counter className="counter-card">
      <div className="icon d-flex align-items-center">
        <Icon className={iconClass}></Icon>
      </div>
      <div className="counter d-flex flex-column align-items-center">
        <span> {heading}</span>
        <span className="text-dark fs-2 fw-bolder">{count}</span>
      </div>
    </Counter>
  );
};

export default CounterCard;
