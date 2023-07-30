import styled from "styled-components";

import profileDefault from "../../images/profile-default.png";
import iconDown from "../../images/svg-icon/icon-down.svg";

const SideBarProfile = ({ userDataDetail }) => {
  return (
    <SideBarContainer>
      <div className='profile-container'>
        <div className='image-container'>
          <img src={profileDefault} alt='profile-default' />
        </div>
        <div className='profile-information'>
          <div className='name'>{userDataDetail.nama_lengkap}</div>
          <div className='no-bpjs'>{userDataDetail.nomor_bpjs}</div>
        </div>
      </div>
      <div className='see-more'>
        <div>See More</div>
        <img src={iconDown} alt='icon-down' />
      </div>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  background: white;
  margin-top: 40px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 16px 16px;
  /* border: 1px solid rgba(0, 0, 0, 0.08); */
  box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
  border-radius: 8px;
  .profile-container {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .profile-information {
    margin-top: 12px;
    .name {
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      color: #001737;
    }
    .no-bpjs {
      font-weight: 400;
      font-size: 13px;
      line-height: 22px;
      color: #8392a5;
    }
  }
  .see-more {
    margin-top: 16px;
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: #2d67f6;
  }
`;

export default SideBarProfile;
