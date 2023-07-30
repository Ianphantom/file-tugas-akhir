import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../utils/apiEndpoint";
// import { decryptionRSA } from "../../utils/encryption";
import CryptoJS from "crypto-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MedicInformation from "../../components/user/MedicInformation";
import ProfileCardHeader from "../../components/card/ProfileCardHeader";

// import context
import { PatientContext } from "../../context/PatientContext";

// import icon
import diagnose from "../../images/svg-icon/icon-diagnose.svg";
import treatment from "../../images/svg-icon/icon-treatment.svg";
import plusIcon from "../../images/svg-icon/icon-plus.svg";
import searchIcon from "../../images/svg-icon/icon-search.svg";

const RekamMedisComponent = ({ id }) => {
  const [medicalRecord, setMedicalRecord] = useState([]);
  const { currentPatient } = useContext(PatientContext);
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

    fetch(`${ENDPOINT}/rekammedis/patient/list/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setMedicalRecord(result.AllMedicalRecord))
      .catch((error) => console.log("error", error));
  }, [id]);
  return (
    <DeskripsiStyled>
      <ToastContainer />
      <div className='rme-header'>
        <div className='title'>Electronic Medical Record</div>
        {currentPatient.permissionLevel === "2" && (
          <Link
            to={`/doctor/tambah-rekam-medis/${id}`}
            className='button-tambah'
          >
            <img src={plusIcon} alt='plus-icon' />
            <div>Add EMR</div>
          </Link>
        )}
      </div>
      <div className='search-container'>
        <img src={searchIcon} alt='search-icon' />
        <input type='text' placeholder='Search...' />
      </div>
      {medicalRecord.map((item, index) => {
        let dataRme;
        // console.log(item.data.rme);
        try {
          const decryptedText = CryptoJS.AES.decrypt(
            item.data.rme,
            currentPatient.aes_key
          ).toString(CryptoJS.enc.Utf8);
          dataRme = JSON.parse(decryptedText);
          console.log(`${index} : ${decryptedText}`);
        } catch (error) {
          toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return <></>;
        }

        return (
          <div
            key={index}
            className='card-design'
            data-aos='fade-left'
            data-aos-duration='800'
          >
            <ProfileCardHeader
              title={dataRme.tanggal}
              desc={`Poli Umum dengan ${dataRme.nama_dokter}`}
            />
            <MedicInformation
              icon={diagnose}
              title='Diagnosis'
              desc={dataRme.diagnosa.map((item) => item.diagnosa)}
            />
            <MedicInformation
              icon={treatment}
              title='Action Given'
              desc={dataRme.tindakan.map((item) => item.tindakan)}
            />
          </div>
        );
      })}
    </DeskripsiStyled>
  );
};

const DeskripsiStyled = styled.div`
  .rme-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 14px;
      color: #000000;
    }

    .button-tambah {
      cursor: pointer;
      background: #2d67f6;
      border-radius: 5px;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      justify-content: center;
      color: #ffffff;
    }
  }

  .search-container {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: #ffffff;
    border: 1px solid #eff2f7;
    border-radius: 8px;
    margin-bottom: 24px;

    input {
      border: none;
      width: 100%;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #9a9a9a;
    }
  }
  .card-design {
    border-radius: 8px;
    background: white;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    margin-bottom: 20px;
  }
`;

export default RekamMedisComponent;
