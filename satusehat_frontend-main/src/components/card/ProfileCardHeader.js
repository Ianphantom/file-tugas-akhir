import React from "react";
import styled from "styled-components";

const ProfileCardHeader = ({ title, desc }) => {
  return (
    <ProfileHeaderContainer>
      <div className='title'>{title}</div>
      <div className='desc'>{desc}</div>
    </ProfileHeaderContainer>
  );
};

const ProfileHeaderContainer = styled.div`
  padding: 16px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #001737;
    margin-bottom: 1px;
  }

  .desc {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #575d78;
  }
`;

export default ProfileCardHeader;
