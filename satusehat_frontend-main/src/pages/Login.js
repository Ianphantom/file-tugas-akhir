import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { ENDPOINT } from "../utils/apiEndpoint";
import { AuthContext } from "../context/AuthContext";

// toast component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const defaultformFields = {
  alamat_email: "",
  password: "",
};

const Login = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const [formFields, setFormFields] = useState(defaultformFields);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const singInUser = async (event) => {
    event.preventDefault();

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(formFields),
      redirect: "follow",
    };
    fetch(`${ENDPOINT}/pasien/login`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
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
          const decodedData = jwt_decode(result.data.token);
          setCurrentUser(decodedData);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("userData", JSON.stringify(decodedData));
          navigate("/user/dashboard");
        }
      })
      .catch((error) => console.log("error", error));

    // console.log(formFields);
  };

  let [messageState, setMessageState] = useState("");
  useEffect(() => {
    AOS.init();
    const params = new URLSearchParams(window.location.search);
    const message = params.get("messege");
    setMessageState(message);
  }, []);
  return (
    <>
      {messageState && (
        <div
          className='alert alert-primary alert-dismissible fade show container mt-4'
          role='alert'
          data-aos='fade-up'
          data-aos-duration='2000'
        >
          <strong>Attention!</strong> {messageState}
          <button
            type='button'
            className='close'
            data-dismiss='alert'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )}

      <LoginContainer className='container'>
        <div className='left' data-aos='zoom-in' data-aos-duration='2000'>
          <div className='title'>Welcome to SatuSehat</div>
          <div className='subtitle'>Sign In With Your Email</div>
          <div className='input-container'>
            <input
              type='email'
              name='alamat_email'
              id='alamat_email'
              className='emailInput'
              placeholder='Enter Your Email Address'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <input
              type='password'
              name='password'
              id='password'
              className='passwordInput'
              placeholder='Enter Your Password'
              onChange={handleChange}
            />
          </div>
          <div className='buttonSubmit' onClick={singInUser}>
            Login
          </div>
          <div className='term'>
            <div className='checklist'>
              <input type='checkbox' name='agree' id='term' />
            </div>
            <div className='text'>
              I have read and accept the <span>Terms of Service</span> and{" "}
              <span>Privacy Policy</span>.
            </div>
          </div>
          <div className='register'>
            No Account Yet?{" "}
            <span>
              <Link to='/register'>Sign up Now!</Link>
            </span>
          </div>
        </div>
        <div className='right'>
          <img
            src='https://cdn.dribbble.com/users/24711/screenshots/5371151/media/beab6129abea011a891497c3324fae61.gif'
            alt='Login Preview'
          />
        </div>
      </LoginContainer>
      <ToastContainer />
    </>
  );
};

const LoginContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;

  /* background: rgba(234, 237, 250, 0.5); */

  display: flex;
  flex-direction: row-reverse;
  gap: 100px;
  .left {
    width: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 50px 50px;
    background: rgba(234, 237, 250, 0.5);
    border-radius: 24px;
    box-shadow: 0px 4px 8px rgba(31, 35, 41, 0.03),
      0px 3px 6px -6px rgba(31, 35, 41, 0.05),
      0px 6px 18px 6px rgba(31, 35, 41, 0.03);
    .title {
      font-weight: 800;
      font-size: 24px;
      line-height: 30px;
      color: #171151;
      margin-bottom: 15px;
    }

    .subtitle {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #646a73;
      margin-bottom: 30px;
    }

    .input-container {
      margin-bottom: 15px;
    }

    input {
      width: 100%;
      background: #ffffff;
      /* border: 1px solid #d0d3d6; */
      border: none;
      border-radius: 6px;
      padding: 15px 12px;
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      color: #8f959e;

      &:focus {
        border: 1px solid #3370ff;
      }
    }

    .buttonSubmit {
      width: 100%;
      background-color: #3370ff;
      padding: 12px 0px;
      border-radius: 6px;
      text-align: center;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
      margin-bottom: 15px;
    }

    .term {
      display: flex;
      gap: 10px;
      .text {
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #646a73;
        span {
          color: #3370ff;
        }
      }
    }

    .register {
      margin-top: 15px;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      color: #646a73;
      span {
        color: #3370ff;
        cursor: pointer;
      }
    }
  }

  .right {
    width: 60%;
    img {
      width: 100%;
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 20px;
    .left {
      width: 100%;
    }

    .right {
      width: 100%;
    }
  }
`;

export default Login;
