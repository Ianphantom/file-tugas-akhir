import React, { useEffect } from "react";
import styled from "styled-components";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ContactContainer className='container'>
      <div className='connect'>
        <div className='left' data-aos='zoom-in-right' data-aos-duration='1000'>
          <div className='subtitle'>Let's Connect</div>
          <div className='title'>Contact our team</div>
          <div className='text'>
            We're happy to answer any questions you may have, just send us a
            message via our in-app chat support or give us a call.
          </div>
        </div>
        <div
          className='right'
          data-aos='zoom-in-left'
          data-aos-duration='1000'
          data-aos-delay='300'
        >
          <div className='identityContainer'>
            <div className='inputContainer'>
              <input type='text' name='name' id='name' placeholder='Name' />
            </div>
            <div className='inputContainer'>
              <input type='email' name='email' id='email' placeholder='Email' />
            </div>
          </div>
          <textarea name='message' id='message'></textarea>
          <div className='button-submit'>Send Message</div>
        </div>
      </div>
      <div className='account' data-aos='fade-up' data-aos-delay='500'>
        <div className='title'>Ready to trust Coinvent with your money?</div>
        <div className='button-container'>
          <div className='button-black'>Get All Access</div>
          <div className='button-transparent'>Login Now</div>
        </div>
      </div>
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  .connect {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    gap: 56px;

    .left {
      width: 35%;
      .subtitle {
        font-weight: 600;
        font-size: 16px;
        line-height: 28px;
        color: #2d67f6;
        margin-bottom: 20px;
      }

      .title {
        font-weight: 700;
        font-size: 36px;
        line-height: 43px;
        letter-spacing: -0.9px;
        color: #000000;
        margin-bottom: 16px;
      }

      .text {
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #5b5b71;
      }
    }

    .right {
      width: 65%;
      .identityContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 16px;
        .inputContainer {
          width: 50%;
          input {
            border-radius: 8px;
            border: none;
            width: 100%;
            padding: 17px 16px;
            background: #f4f6fc;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #000000;
          }
        }
      }

      textarea {
        width: 100%;
        margin-bottom: 16px;
        border: none;
        padding: 17px 16px;
        background: #f4f6fc;
        border-radius: 8px;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        height: 40vh;
      }

      .button-submit {
        cursor: pointer;
        background-color: #2d67f6;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #ffffff;
        text-align: center;
        padding: 17px 0px;
        border-radius: 8px;
      }
    }
  }

  .account {
    margin-top: 40px;
    margin-bottom: 50px;
    padding: 56px 56px;
    background: rgba(234, 237, 250, 0.5);
    box-shadow: 0px 48px 56px -8px rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    .title {
      width: 50%;
      font-weight: 600;
      font-size: 42px;
      line-height: 64px;
      letter-spacing: -2px;
      color: #0f172a;
      margin-bottom: 32px;
    }

    .button-container {
      display: flex;
      gap: 16px;
      .button-black {
        width: fit-content;
        padding: 15px 24px;
        background: #000000;
        border-radius: 6px;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
      }
      .button-transparent {
        border: 1px solid rgba(91, 91, 113, 0.2);
        width: fit-content;
        padding: 15px 24px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
      }
    }
  }

  @media (max-width: 1000px) {
    .connect {
      flex-direction: column;
      .left {
        text-align: center;
        width: 100%;
      }
      .right {
        width: 100%;
      }
    }

    .account {
      .title {
        width: 100%;
      }
    }
  }
`;
export default Contact;
