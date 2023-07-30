import React, { useEffect } from "react";
import styled from "styled-components";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const Service = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ServiceContainer className='container'>
      <div className='rowClass'>
        <div
          className='card-item'
          id='back1'
          data-aos='fade-right'
          data-aos-duration='1500'
        >
          <div className='left'>
            <div className='title'>Lark for global collaboration</div>
            <div className='text'>
              Use Lark for communicating across different languages and
              timezones with your globally distributed teams.
            </div>
            <div className='button-container'>Learn More</div>
          </div>
          <div className='right'>
            <img
              src='https://framerusercontent.com/images/AuWmWnISa8VMGanV9I3kQLsAE.png?scale-down-to=1024'
              alt='service preview'
            />
          </div>
        </div>
        <div
          className='card-item'
          id='back4'
          data-aos='fade-left'
          data-aos-duration='1500'
          data-aos-delay='300'
        >
          <div className='left'>
            <div className='title'>Lark for global collaboration</div>
            <div className='text'>
              Use Lark for communicating across different languages and
              timezones with your globally distributed teams.
            </div>
            <div className='button-container'>Learn More</div>
          </div>
          <div className='right'>
            <img
              src='https://framerusercontent.com/images/LbvJMYEyVSOUjTGAFkL6eujup0.png?scale-down-to=1024'
              alt='service preview'
            />
          </div>
        </div>
        <div
          className='card-item'
          id='back3'
          data-aos='fade-right'
          data-aos-duration='1500'
          data-aos-delay='600'
        >
          <div className='left'>
            <div className='title'>Lark for global collaboration</div>
            <div className='text'>
              Use Lark for communicating across different languages and
              timezones with your globally distributed teams.
            </div>
            <div className='button-container'>Learn More</div>
          </div>
          <div className='right'>
            <img
              src='https://framerusercontent.com/images/LbvJMYEyVSOUjTGAFkL6eujup0.png?scale-down-to=1024'
              alt='service preview'
            />
          </div>
        </div>
        <div
          className='card-item'
          id='back2'
          data-aos='fade-left'
          data-aos-duration='1500'
          data-aos-delay='900'
        >
          <div className='left'>
            <div className='title'>Lark for global collaboration</div>
            <div className='text'>
              Use Lark for communicating across different languages and
              timezones with your globally distributed teams.
            </div>
            <div className='button-container'>Learn More</div>
          </div>
          <div className='right'>
            <img
              src='https://framerusercontent.com/images/AuWmWnISa8VMGanV9I3kQLsAE.png?scale-down-to=1024'
              alt='service preview'
            />
          </div>
        </div>
      </div>
    </ServiceContainer>
  );
};

const ServiceContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  .rowClass {
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-evenly;
    gap: 24px;

    .card-item {
      &:hover {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
      cursor: pointer;
      background-color: aliceblue;
      padding: 42px 24px;
      display: flex;
      border-radius: 8px;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60%;
        .title {
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: -0.2px;
          color: #000000;
          margin-bottom: 11px;
        }
        .text {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
          margin-bottom: 16px;
        }
        .button-container {
          width: 140px;
          align-items: center;
          padding: 11px 28px;
          background: #ffffff;
          box-shadow: 0px 2px 4px rgba(31, 35, 41, 0.06),
            0px 1px 2px -2px rgba(31, 35, 41, 0.06);
          border-radius: 6px;

          font-weight: 400;
          font-size: 15px;
          line-height: 22px;
          color: #3370ff;
        }
      }

      .right {
        width: 40%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 90%;
          &:hover {
            position: absolute;
            width: 100%;
            overflow: hidden;
          }
        }
      }
    }

    #back1 {
      background: #f0f4ff;
    }
    #back2 {
      background: #f3ebff;
    }

    #back3 {
      background: #f2f5fa;
    }

    #back4 {
      background: #ecf9ff;
    }
  }

  @media (max-width: 1000px) {
    .rowClass {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default Service;
