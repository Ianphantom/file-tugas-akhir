import React, { useEffect, useState, useContext } from "react";
import { ENDPOINT } from "../../utils/apiEndpoint";
import { useParams } from "react-router-dom";
import { PatientContext } from "../../context/PatientContext";
import { decryptionRSA } from "../../utils/encryption";
import styled from "styled-components";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

// Toast Item
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import component
import RekamMedisComponent from "../../components/dokter/RekamMedisComponent";
import CardInformation from "../../components/card/CardInformation";
import ProfileCardHeader from "../../components/card/ProfileCardHeader";

// import icon
import healthHistory from "../../images/svg-icon/icon-healthHistory.svg";

const DokterDetailRekamMedis = () => {
  const { id } = useParams();
  const [encrypted, setEncrypted] = useState(true);
  const [statusCode, setStatusCode] = useState("");
  const { currentPatient, setCurrentPatient } = useContext(PatientContext);

  const inputHandler = (event) => {
    setCurrentPatient({ ...currentPatient, private_key: event.target.value });
  };
  const decryptMe = () => {
    try {
      const aesKey = decryptionRSA(
        currentPatient.private_key,
        currentPatient.signatureUserKey
      );
      setCurrentPatient({ ...currentPatient, aes_key: aesKey });
      setEncrypted(!encrypted);
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
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
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

    fetch(`${ENDPOINT}/rekammedis/patient/${id}`, requestOptions)
      .then((response) => {
        setStatusCode(response.status);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setCurrentPatient(result);
      })
      .catch((error) => console.log("error", error));
  }, [id, setCurrentPatient]);
  return (
    <DetailRekamMedisContainer>
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
                desc='This is patients encrypted medical record. '
              />
              <CardInformation
                icon={healthHistory}
                title='Permission'
                desc={
                  statusCode >= 400
                    ? `Your status is not allowed. Make sure patients gives you permission.`
                    : `Your status is allowed. Enter your private key to open this health history.`
                }
                color={statusCode >= 400 ? "red" : "green"}
              />
            </div>
          </div>
          {statusCode <= 400 && (
            <>
              <div className='key-container'>
                <textarea
                  name='private-key'
                  id='private-key'
                  cols='30'
                  rows='5'
                  defaultValue='Masukkan Private Key'
                  onChange={inputHandler}
                ></textarea>
              </div>
              <ToastContainer />
              <div className='button'>
                <div className='text' onClick={decryptMe}>
                  Enter Key
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <RekamMedisComponent id={id} />
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
    textarea {
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

export default DokterDetailRekamMedis;
