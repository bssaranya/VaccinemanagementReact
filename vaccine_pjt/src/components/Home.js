import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const CarouselContainer = styled(Carousel)`
  width: 100vw;
  height: 80vh;
`;
const Home = () => {
  return (
    <>
      <CarouselContainer>
        {/* first image */}
        <Carousel.Item>
          <img
            className="d-block w-100 caurosel"
            src="https://www.fortismumbai.com/frontend/blogimage/COVID-19%20related%20hair%20loss%20and%20hearing%20problems%20How%20to%20deal%20with%20the%20after%20effects%20of%20coronavirus%20infection-1604652273.jpg"
            alt="Second slide"
          />
        </Carousel.Item>

        {/* second image */}
        <Carousel.Item>
          <img
            className="d-block w-100 caurosel"
            src="https://images.unsplash.com/flagged/photo-1584036561584-b03c19da874c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 caurosel"
            src="https://images.livemint.com/img/2020/08/04/1600x900/PTI06-06-2020_000157A_1591872142181_1596526320468.jpg"
            alt="Second slide"
          />
        </Carousel.Item>

        {/* third image */}
        <Carousel.Item>
          <img
            className="d-block w-100 caurosel"
            src="https://media.gettyimages.com/id/1210596198/photo/coronavirus-group.jpg?s=612x612&w=0&k=20&c=gYFhvW6cJuKp9BEz-8jJVFcilG_swF5W9L094-dk3uM="
            alt="Third slide"
          />
        </Carousel.Item>
      </CarouselContainer>
    </>
  );
};

export default Home;
