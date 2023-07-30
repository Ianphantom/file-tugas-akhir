import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import NavBarUser from "../../components/user/NavBarUser";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import backArrow from "../../images/svg-icon/icon-back.svg";
import { AuthContext } from "../../context/AuthContext";
import InputComponent from "../../components/input/input.component";

import { encryptionRSA } from "../../utils/encryption";
import { ENDPOINT } from "../../utils/apiEndpoint";

// toast component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const SkeltonUser = () => {
  const url = useLocation().pathname.split("/");
  const [backComponent, setBackComponent] = useState(false);
  const navigate = useNavigate();
  const goBackButton = () => {
    navigate(-1);
  };

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  // signature key part
  const [signatureKey, setSignatureKey] = useState("");

  const signatureInputHandler = (event) => {
    setSignatureKey(event.target.value);
  };

  const signatureKeyHandlerSubmit = () => {
    const userSignatureKey = encryptionRSA(
      currentUser.public_key,
      signatureKey
    );

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    let dataToSend = JSON.stringify({
      signature_key: userSignatureKey,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: dataToSend,
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/pasien/${currentUser.uid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status >= 400) {
          for (let prop in result.messages) {
            toast.error(result.messages[prop], {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else if (result) {
          toast.success("Data Has Been Updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setCurrentUser({ ...currentUser, signature_key: userSignatureKey });
          localStorage.setItem("userData", JSON.stringify(currentUser));
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (url[2] === "profile" || url.length > 3) {
      setBackComponent(true);
    } else {
      setBackComponent(false);
    }
    AOS.init();
  }, [url]);

  return (
    <SkeletonContainer>
      <ToastContainer />
      {!currentUser.signature_key && (
        <div className='popup'>
          <div className='container'>
            <div className='card'>
              <div className='title'>
                <div>You Need To Set A Signature Key</div>
              </div>
              <div className='body-card' id='1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus officiis dolore perspiciatis ex, commodi, vel voluptas
                nam dolor, exercitationem repellendus qui non. Accusamus, quas!
                Quod.
              </div>
              <div className='body-card' id='1'>
                - It should be minumum 16 character
              </div>
              <InputComponent
                type='text'
                name='signatureKey'
                placeholder='Enter Your Signature Key'
                onChange={signatureInputHandler}
              />
              <div
                className='button-container'
                onClick={signatureKeyHandlerSubmit}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='container'>
        {backComponent && (
          <div className='back' data-aos='fade-left' data-aos-duration='1500'>
            <img src={backArrow} alt='icon-back' onClick={goBackButton} />
            <div className='text'>Back To Previous</div>
          </div>
        )}

        <div className='main'>
          <div className='left-skeleton'>
            <NavBarUser />
          </div>
          <div className='right-skeleton'>
            <Outlet />
          </div>
        </div>
      </div>
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled.div`
  background: rgba(240, 244, 255, 0.5);

  .popup {
    position: absolute;
    z-index: 20;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(5px);
    padding-top: 42px;
    .card {
      padding: 16px 16px;
      background-color: white;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #333333;
      .title {
        font-weight: 600;
        font-size: 16px;
        line-height: 14px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .button-container {
      text-align: center;
      cursor: pointer;
      padding: 12px 24px;
      background-color: #2d67f6;
      border-radius: 5px;
      color: #ffffff;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
    }
  }

  .back {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 0px;
    .text {
      font-weight: 600;
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 1px;
      text-transform: uppercase;

      color: #555555;
    }
    img {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .main {
    display: flex;
    .left-skeleton {
      width: 25%;
    }

    .right-skeleton {
      width: 75%;
      border-left: 1px solid rgba(0, 0, 0, 0.08);
    }
  }

  @media (max-width: 1000px) {
    .main {
      flex-direction: column;
      .left-skeleton {
        width: 100%;
      }
      .right-skeleton {
        width: 100%;
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

export default SkeltonUser;
