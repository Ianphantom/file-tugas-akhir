import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// toast component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ENDPOINT } from "../utils/apiEndpoint";
import { generateKeyPair } from "../utils/encryption";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const defaultformFields = {
  alamat_email: "",
  password: "",
  confPassword: "",
  nomor_bpjs: "",
  nama_lengkap: "",
  public_key: "",
  private_key: "",
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { password, confPassword } = formFields;
  const [isOpen, setIsOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null);
  let navigate = useNavigate();

  const handleCopy = () => {
    if (inputRef.current) {
      if (inputRef.current) {
        console.log(inputRef.current.value);
        navigator.clipboard
          .writeText(inputRef.current.value)
          .then(() => {
            alert("Text copied to clipboard");
            setIsCopied(!isCopied);
          })
          .catch((error) => {
            alert("Failed to copy text:", error);
          });
      }
    }
  };

  const tooglePopUp = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  };

  const closeHandler = () => {
    tooglePopUp();
    toast.success("Account Has Been Registered", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      navigate(
        "/login?messege=Account Has Been Registered! Read Email from Us for your private key information and email validation"
      );
    }, 2000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const registerUser = async (event) => {
    event.preventDefault();

    if (password !== confPassword) {
      toast.error("Your Password not match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return 0;
    }

    const key = generateKeyPair();
    const cleanedPrivateKey = String(key.privateKey)
      .replace(
        /-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----/g,
        ""
      )
      .replace(/\s|\n/g, "");

    setPrivateKey(cleanedPrivateKey);
    const dataToSend = {
      ...formFields,
      public_key: key.publicKey,
      private_key: cleanedPrivateKey,
    };

    console.log(dataToSend);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(dataToSend),
      redirect: "follow",
    };
    fetch(`${ENDPOINT}/pasien`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.status === 400) {
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
          tooglePopUp();
        }
      })
      .catch((error) => console.log("error", error));

    // console.log(formFields);
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <InformationContainer>
      <RegisterContainer className='container'>
        <div className='left' data-aos='zoom-in' data-aos-duration='2000'>
          <div className='title'>Welcome to SatuSehat</div>
          <div className='subtitle'>Create Your New Account</div>
          <div className='input-container'>
            <input
              type='name'
              name='nama_lengkap'
              id='nama'
              className='emailInput'
              placeholder='Enter Your Name'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <input
              type='email'
              name='alamat_email'
              id='email'
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
          <div className='input-container'>
            <input
              type='password'
              name='confPassword'
              id='repassword'
              className='passwordInput'
              placeholder='Re-enter Your Password'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <input
              type='number'
              name='bpjs'
              id='bpjs'
              className='passwordInput'
              placeholder='Enter Your BPJS Number'
              onChange={handleChange}
            />
          </div>
          <div className='buttonSubmit' onClick={registerUser}>
            Register
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
            Already have account?{" "}
            <span>
              <Link to='/login'>Login Now!</Link>
            </span>
          </div>
        </div>
        <div className='right'>
          <img
            src='https://cdn.dribbble.com/users/24711/screenshots/5371151/media/beab6129abea011a891497c3324fae61.gif'
            alt='Login Preview'
          />
        </div>
        <ToastContainer />
      </RegisterContainer>
      {isOpen && (
        <div className='popup'>
          <div className='container'>
            <div className='card'>
              <div className='title'>
                <div>Private Key</div>
                {isCopied && <div onClick={closeHandler}>&#10005;</div>}
              </div>
              <div className='body-card' id='1'>
                In addition, we would like to remind you about the importance of
                your private key. Your private key is a crucial component of
                your account's security. It is unique to you and allows you to
                access your encrypted data. Please ensure that you save your
                private key securely and do not share it with anyone. If you
                lose your private key, you will lose access to your data
                permanently.
              </div>
              <div className='body-card' id='2'>
                We strongly recommend the following measures to keep your
                private key safe:
              </div>
              <div className='body-card' id='3'>
                <div>
                  - Store your private key in a secure location, such as a
                  password manager or an encrypted storage device.
                </div>
                <div>
                  - Make regular backups of your private key and store them in
                  separate secure locations.
                </div>
                <div>
                  - Avoid sharing your private key with anyone, including our
                  support team. We will never ask you to provide your private
                  key.
                </div>
              </div>
              <textarea
                name='privateKey'
                id='privateKey'
                ref={inputRef}
                readOnly
                defaultValue={privateKey}
              ></textarea>
              <div className='button' onClick={handleCopy}>
                Copy to Clipboard
              </div>
            </div>
          </div>
        </div>
      )}
    </InformationContainer>
  );
};

const InformationContainer = styled.div`
  .popup {
    position: absolute;
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

      textarea {
        padding: 10px 10px;
        border: 1px solid #ccd6ef;
        border-radius: 4px;
      }

      .button {
        background: #2d67f6;
        border-radius: 0px 0px 4px 4px;
        text-align: center;
        padding: 10px 0px;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
`;

const RegisterContainer = styled.div`
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
      padding: 12px 12px;
      font-weight: 400;
      font-size: 14px;
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
      cursor: pointer;
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

export default Register;
