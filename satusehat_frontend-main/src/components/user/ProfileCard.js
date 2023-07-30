import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import userProfile from "../../images/user-profile.png";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const ProfileCard = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ProfileCardContainer
      className='h-100'
      data-aos='fade-up'
      data-aos-duration='2000'
    >
      <div className='top'>
        <div>
          <div className='title'>Welcome Back!</div>
          <div className='nameApp'>Satu Sehat App Indonesia</div>
        </div>
        <div className='imageContainer'>
          <img src={userProfile} alt='Profile User' />
        </div>
      </div>
      <div className='bottom'>
        <div className='profile-container'>
          <div className='profile-container-top'>
            <div>
              <div className='top-title'>{userData.nama_lengkap}</div>
              <div className='bottom-subtitle'>{userData.nomor_bpjs}</div>
            </div>
            <div>
              <div className='top-title'>125</div>
              <div className='bottom-subtitle'>Projects</div>
            </div>
            <div>
              <div className='top-title'>1245</div>
              <div className='bottom-subtitle'>Revenue</div>
            </div>
            <Link to='/user/profile'>
              <div className='profile-container-bottom'>
                <div className='button'>View Profile</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ProfileCardContainer>
  );
};

const ProfileCardContainer = styled.div`
  background: #ffffff;
  /* border: 1px solid rgba(0, 0, 0, 0.08); */
  border-radius: 8px;
  /* box-shadow: 2px 2px 5px rgba(60, 70, 83, 0.04); */
  box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
  .top {
    /* background: #d6d4f9; */
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    /* background-color: #f0f4ff; */
    padding: 16px 16px;
    line-height: 20px;
    color: #2d67f6;
    display: flex;
    justify-content: space-between;
    .title {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 7.5px;
    }
    .nameApp {
      font-weight: 500;
      font-size: 14px;
    }

    .imageContainer {
      img {
        width: 100%;
      }
    }
  }

  .bottom {
    padding: 16px 16px;
    .top-title {
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      color: #495057;
      margin-bottom: 8px;
    }
    .bottom-subtitle {
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #74788d;
    }

    .profile-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .profile-container-top {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .button {
          padding: 12px 24px;
          cursor: pointer;
          background-color: #2d67f6;
          border-radius: 5px;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
        }
      }
    }
  }
`;

export default ProfileCard;
