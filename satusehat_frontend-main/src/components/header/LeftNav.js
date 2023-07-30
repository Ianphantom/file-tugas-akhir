import React, { useContext } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";

const LeftNav = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const logoutHandler = () => {
    setCurrentUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  };
  return (
    <LeftNavContainer>
      {currentUser ? (
        <div className='userLoginNavigation'>
          <Link
            className='nav-item nav-link'
            to={`/${
              currentUser.roles === "pasien"
                ? "user"
                : currentUser.roles === "dokter"
                ? "doctor"
                : currentUser
            }/dashboard`}
          >
            Dashboard
          </Link>
          <div
            to='/logout'
            className='button-container'
            onClick={logoutHandler}
          >
            Logout
          </div>
        </div>
      ) : (
        <Link to='/login' className='button-container'>
          Login
        </Link>
      )}
    </LeftNavContainer>
  );
};

const LeftNavContainer = styled.div`
  display: flex;
  align-items: center;

  .button-container {
    cursor: pointer;
    padding: 12px 24px;
    background-color: #2d67f6;
    border-radius: 5px;
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
  }

  .userLoginNavigation {
    display: flex;
    align-items: center;
    gap: 30px;
  }
`;

export default LeftNav;
