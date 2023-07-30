import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { decryptionRSA } from "../../utils/encryption";
import { ENDPOINT } from "../../utils/apiEndpoint";

// import component
import DeskripsiRekamMedis from "../../components/user/DeskripsiRekamMedisComponent";
import CardInformation from "../../components/card/CardInformation";
import ProfileCardHeader from "../../components/card/ProfileCardHeader";

// import icon
import healthHistory from "../../images/svg-icon/icon-healthHistory.svg";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";

const DetailRekamMedis = () => {
  const { id } = useParams();

  const [encrypted, setEncrypted] = useState(true);
  const [key, setKey] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [dataRekamMedis, setDataRekamMedis] = useState({});

  const inputHandler = (e) => {
    setKey(e.target.value);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const decryptMe = () => {
    let aesKey;
    try {
      aesKey = decryptionRSA(key, currentUser.signature_key);
    } catch (error) {
      toast.error("Your Private Key is False", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/rekammedis/specific/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          const decryptedText = CryptoJS.AES.decrypt(
            result.returnValue.data.rme,
            aesKey
          ).toString(CryptoJS.enc.Utf8);
          // console.log(decryptedText);
          setDataRekamMedis(JSON.parse(decryptedText));
          setEncrypted(false);
        } catch (error) {
          console.log(`error :` + error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // const decryptRme = () => {
  //   try {
  //     decryptionRSA
  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
  //   try {
  //     const decryptedText = CryptoJS.AES.decrypt(encryptedText, key).toString(
  //       CryptoJS.enc.Utf8
  //     );
  //     console.log(decryptedText);
  //     setEncrypted(false);
  //   } catch (error) {
  //     toast.error("Your Signature Key is False", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };

  return (
    <DetailRekamMedisContainer>
      {/* <div className='alert alert-primary  fade show' role='alert'>
        <strong>ITS Medical Center!</strong> 19 January 2023, 15:00 WIB
      </div> */}
      {encrypted === true ? (
        <div className='data-sementara'>
          <div>
            <div
              className='card-design'
              data-aos='fade-left'
              data-aos-duration='800'
            >
              <ProfileCardHeader
                title='Medical Record'
                desc='This is your encrypted medical record. Enter your signature key to decrypt'
              />
              <CardInformation
                icon={healthHistory}
                title='Health History'
                desc={`Your data is still encrypted. Please provide signature key to decrypt your data`}
              />
            </div>
          </div>
          <div className='key-container'>
            <input
              value={key}
              onChange={inputHandler}
              type='text'
              className='keyInput'
              placeholder='Enter your signature key'
            />
          </div>
          <ToastContainer />
          <div className='button'>
            <div className='text' onClick={decryptMe}>
              Enter Key
            </div>
          </div>
        </div>
      ) : (
        <DeskripsiRekamMedis dataRekamMedis={dataRekamMedis} />
      )}

      {/* <DeskripsiRekamMedis /> */}
    </DetailRekamMedisContainer>
  );
};

const DetailRekamMedisContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
  .card-design {
    border-radius: 8px;
    background: white;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    margin-bottom: 20px;
  }

  .key-container {
    width: 100%;
    input {
      border-radius: 8px;
      border: none;
      width: 100%;
      padding: 15px 15px;
      background: white;
      font-weight: 400;
      font-size: 13px;
      line-height: 19px;
      color: #000000;
    }
  }

  .button {
    margin-top: 10px;
    cursor: pointer;
    /* background-color: #407eb4; */
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    .text {
      padding: 15px 15px;
      border-radius: 8px;
      color: white;
      width: fit-content;
      background: #2d67f6;
    }
  }
`;

export default DetailRekamMedis;
