import React, { useEffect } from "react";
import styled from "styled-components";

// import images
import landingImage from "../images/landing-image1.png";
import landingImage2 from "../images/landing-image2.png";
import landingPerson from "../images/landing-person.png";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <HomeContainer className='container'>
        <div className='left'>
          <h1 className='title'>Indonesia's Electronic Medical Record</h1>
          {/* <h2 className='subtitle'>
          Your full service lab for clinical trials. Our mission is to ensure
          the generation of accurate and precise findings
        </h2> */}
          <div
            className='button-container'
            data-aos='fade-right'
            data-aos-duration='2000'
          >
            <div className='button'>Login to Your Account</div>
            {/* <div className='button' id='secondary'>
            Create Account
          </div> */}
          </div>
          <div
            className='bottom-container'
            data-aos='zoom-in'
            data-aos-easing='linear'
            data-aos-delay='300'
          >
            <div className='user'>
              <img src={landingPerson} alt='' />
            </div>
            <div className='rating-container'>
              <div className='top'>
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 2.10938L15.09 8.36938L22 9.37938L17 14.2494L18.18 21.1294L12 17.8794L5.82 21.1294L7 14.2494L2 9.37938L8.91 8.36938L12 2.10938Z'
                    stroke='#2D67F6'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <div className='text'>4.8 / 5 starts on G2</div>
              </div>
              <div className='bottom'>Trusted by 20,000+ users</div>
            </div>
          </div>
        </div>

        <div className='right' data-aos='fade-left' data-aos-duration='2000'>
          <img src={landingImage} alt='Landing Preview' />
        </div>
      </HomeContainer>
      <InformationContainer className='container'>
        <div className='left'>
          <img src={landingImage2} alt='Landing Preview' />
        </div>
        <div className='right'>
          <div className='subtitle'>Built for You</div>
          <div className='text'>
            Outline provides more than <span>20 design tools </span> making it
            the best in the industry.
          </div>
          <div className='miner'>Be A Miner Now!</div>
        </div>
      </InformationContainer>
    </>
  );
};

const HomeContainer = styled.div`
  padding: 70px 0px;
  display: flex;
  align-items: center;
  .left {
    width: 40%;
    .title {
      font-weight: 700;
      font-size: 48px;
      line-height: 58px;
      letter-spacing: -1.2px;
      color: #000000;
    }

    .subtitle {
      margin-top: 31px;
      font-weight: 400;
      font-size: 18px;
      line-height: 29px;
      color: #333333;
    }

    .button-container {
      margin-top: 31px;
      display: flex;
      align-items: center;
      gap: 27px;
      cursor: pointer;
      .button {
        padding: 20px 20px;
        font-weight: 700;
        font-size: 19px;
        line-height: 27px;
        color: #ffffff;
        border-radius: 12px;
        background: #2d67f6;
        transition: all ease 1s;
        &:hover {
          color: #2d67f6;
          border: 1px solid #2d67f6;
          background-color: white;
        }
      }

      #primary {
        background: #2d67f6;
      }
      #secondary {
        background: #10d0a1;
      }
    }

    .bottom-container {
      margin-top: 72px;
      display: flex;
      align-items: center;
      gap: 50px;

      .rating-container {
        display: flex;
        flex-direction: column;
        gap: 7px;
        .top {
          display: flex;
          align-items: center;
          gap: 8px;
          .text {
            font-weight: 700;
            font-size: 16px;
            line-height: 26px;
            color: #000000;
          }
        }

        .bottom {
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #000000;
        }
      }
    }
  }

  .right {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    text-align: center;

    .left {
      margin-bottom: 50px;
      width: 100%;
      justify-content: center;
      align-items: center;

      .button-container {
        justify-content: center;
      }

      .bottom-container {
        margin-top: 30px;
        flex-direction: column;
        gap: 30px;
      }
    }

    .right {
      width: 100%;
    }
  }
`;

const InformationContainer = styled.div`
  margin-top: 0px;
  margin-bottom: 120px;
  padding: 70px 80px;
  background: rgba(234, 237, 250, 0.5);
  border-radius: 24px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 20px;
  .left {
    width: 40%;
    text-align: right;
    img {
      width: 80%;
    }
  }
  .right {
    width: 60%;
    .subtitle {
      font-weight: 400;
      font-size: 32px;
      line-height: 38px;
      color: #333333;
      margin-bottom: 24px;
    }

    .text {
      font-weight: 700;
      font-size: 32px;
      line-height: 48px;
      color: #000000;
      span {
        color: #2d67f6;
      }
    }

    .miner {
      margin-top: 40px;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #2d67f6;
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    padding: 70px 70px;
    .left {
      width: 100%;
      text-align: center;
      img {
        display: none;
      }
    }

    .right {
      text-align: center;
      width: 100%;
    }
  }
`;

export default Home;
