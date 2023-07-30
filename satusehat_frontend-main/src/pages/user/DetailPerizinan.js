import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINT } from "../../utils/apiEndpoint";
import { encryptionRSA, decryptionRSA } from "../../utils/encryption";
import { AuthContext } from "../../context/AuthContext";
import CardInformation from "../../components/card/CardInformation";

// import icon
import iconNama from "../../images/svg-icon/icon-nama.svg";
import email from "../../images/svg-icon/icon-mail.svg";
import time from "../../images/svg-icon/icon-calender.svg";
import password from "../../images/svg-icon/icon-password.svg";
import warning from "../../images/svg-icon/icon-warning.svg";
import goBack from "../../images/svg-icon/icon-goBack.svg";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

// toast component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultFormFields = {
  questionFields: null,
  privateKey: null,
};

const DetailPerizinan = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const status = "waiting";
  const [cardShow, setCardShow] = useState(true);
  const [dataPerizinan, setDataPerizinan] = useState({});
  const [dataPengaju, setDataPengaju] = useState({});
  const [formFields, setFormFields] = useState(defaultFormFields);

  const inputCompare = `bpjs/${currentUser.nomor_bpjs}`;

  const showOtherCard = () => {
    setCardShow(!cardShow);
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandler = (event) => {
    if (formFields.questionFields !== inputCompare) {
      toast.error("The text required is not the same!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    let userSignatureKey;
    try {
      userSignatureKey = decryptionRSA(
        formFields.privateKey,
        currentUser.signature_key
      );
    } catch (error) {
      toast.error("Wrong Private Key", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const doctorNewSignatureKey = encryptionRSA(
      dataPengaju.public_key,
      userSignatureKey
    );

    const currentTime = new Date().getTime();
    const limitTime = currentTime + parseInt(dataPerizinan.durasi) * 60 * 1000;

    const dataToSend = {
      uuid_petugas_rs: dataPengaju.uuid,
      uuid_pasien: currentUser.uid,
      status: "Akses Diberikan",
      timeStart: currentTime,
      timeExp: limitTime,
      newSignatureKey: doctorNewSignatureKey,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(dataToSend),
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/perizinan/update/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
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
          toast.success("Permission Has Been Updated", {
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
            navigate("/user/perizinan");
          }, 2000);
        }
      })
      .catch((error) => console.log("error", error));
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

    fetch(`${ENDPOINT}/perizinan/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDataPerizinan(result.data_perizinan);
        setDataPengaju(result.data_pengaju[0]);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  return (
    <DetailContainer>
      <ToastContainer />
      {dataPerizinan && (
        <>
          <div
            className='card-design'
            data-aos='fade-up'
            data-aos-duration='1500'
          >
            <div className={`status ${status}`}>
              <div className='waktuAkses'>{dataPengaju.nama_klinik}</div>
              <div className='namaDokter'>{dataPengaju.nama_lengkap}</div>
            </div>
          </div>
          {cardShow && (
            <div
              className='card-design'
              data-aos='fade-up'
              data-aos-duration='1500'
              data-aos-delay='300'
            >
              <CardInformation
                icon={iconNama}
                title='Physican Name'
                desc={dataPengaju.nama_lengkap}
              />
              <CardInformation
                icon={password}
                title='Access Requested'
                desc={
                  dataPerizinan.akses === "2"
                    ? "Read and Write Access"
                    : "Read Access"
                }
              />
              <CardInformation
                icon={time}
                title='Time Requested'
                desc={`${dataPerizinan.durasi} Minutes`}
              />
              <CardInformation
                icon={email}
                title='Reason'
                desc={dataPerizinan.alasan}
              />
              {/* button for granting access */}
              {status === "waiting" ? (
                <div className='button-container'>
                  <div className='button' onClick={showOtherCard}>
                    Grant Access
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </>
      )}

      {!cardShow && (
        <div
          className='card-design question'
          data-aos='fade-up'
          data-aos-duration='500'
        >
          <div className='top-question'>
            {/* <div className='title'>Are You Absolutely Sure?</div> */}
            <div className='warning'>
              <div className='icon-warning'>
                <img src={warning} alt='warning-icon' />
              </div>
              <div className='warning-text'>
                Unexpected bad things will happen if you don't read this!
              </div>
            </div>
            <div className='previous' onClick={showOtherCard}>
              <img src={goBack} alt='Go Back Icon' />
            </div>
          </div>

          <div className='text'>
            This action <span>cannot be undone</span>. This will temporaly give
            the pyhsican access until the requested time. Giving access to
            untrust person can harm your medical records.
          </div>
          <div className='text'>
            Please type <span>{inputCompare}</span> to confirm
          </div>
          <div className='input-user'>
            <input
              type='text'
              name='questionFields'
              placeholder='Enter the requested text'
              onChange={inputHandler}
            />
            <textarea
              name='privateKey'
              id='privatekey'
              defaultValue={"Masukkan Private Key"}
              onChange={inputHandler}
            ></textarea>
            <div className='button' onClick={submitHandler}>
              I understand the consequences, grant access
            </div>
          </div>
        </div>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
  .card-design {
    border-radius: 8px;
    background: white;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    margin-bottom: 20px;
  }

  .status {
    padding: 16px 16px;
    border-radius: 8px;

    .waktuAkses {
      font-weight: 400;
      font-size: 11px;
      line-height: 15px;
      margin-bottom: 5px;
    }
    .namaDokter {
      font-weight: 500;
      font-size: 14px;
      line-height: 16p x;
    }
    &.allowed {
      background: #e6ffe5;
      border-left: 3px solid #038c00;
      .waktuAkses {
        color: rgba(13, 78, 43, 0.7);
      }
      .namaDokter {
        color: #038c00;
      }
    }
    &.blocked {
      background: #ffecec;
      border-left: 3px solid #ff0000;
      .waktuAkses {
        color: rgba(255, 0, 0, 0.7);
      }
      .namaDokter {
        color: #ff0000;
      }
    }
    &.waiting {
      background: #fff7e7;
      border-left: 3px solid #ff6b00;
      .waktuAkses {
        color: rgba(255, 107, 0, 0.7);
      }
      .namaDokter {
        color: #ff6b00;
      }
    }
  }

  .button-container {
    cursor: pointer;
    width: fit-content;
    padding: 16px 16px;
    margin-left: auto;
    .button {
      padding: 12px 24px;
      background-color: #2d67f6;
      border-radius: 5px;
      color: #ffffff;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
    }
  }

  .question {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #001737;

    .top-question {
      padding: 16px 16px;
      border-bottom: 1px solid #eff2f7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      .warning {
        color: rgba(255, 0, 0, 0.7);
        font-weight: 600;

        display: flex;
        align-items: center;
        gap: 10px;
      }
      .previous {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 400;
        font-size: 13px;
      }
    }

    .text {
      padding: 0px 16px;
      padding-bottom: 10px;
      font-weight: 400;
      span {
        font-weight: 600;
      }
    }

    .input-user {
      padding: 16px 16px;
      padding-top: 0px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      input {
        width: 100%;
        border-radius: 8px;
        border: 1px solid #eff2f7;
        padding: 10px 10px;
      }

      textarea {
        padding: 10px 10px;
        border-radius: 8px;
        border: 1px solid #eff2f7;
        color: #666666;
      }

      .button {
        text-align: center;
        padding: 12px 24px;
        background-color: #2d67f6;
        border-radius: 5px;
        color: #ffffff;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
      }
    }
  }
`;

export default DetailPerizinan;
