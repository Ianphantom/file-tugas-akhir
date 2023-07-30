import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { ENDPOINT } from "../../utils/apiEndpoint";

import NewsComponent from "../../components/user/NewsComponent";

// import images
import adminBanner from "../../images/bannerAdmin.png";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const DokterDashboard = () => {
  // const { detailUser } = { ...JSON.parse(localStorage.getItem("userData")) };
  // const { nama_lengkap, nama_klinik } = detailUser;
  const { currentUser } = useContext(AuthContext);

  const [detailUser, setDetailUser] = useState({});
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/petugasrs/${currentUser.uid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...currentUser, detailUser: result[0] })
        );
        setDetailUser(result[0]);
      })
      .catch((error) => console.log("error", error));
  }, [currentUser]);
  return (
    <DashboardContainer>
      <div className='section-one'>
        <div className='information'>
          <div className='title'>Welcome {detailUser.nama_lengkap}</div>
          <div className='subtitle'>{detailUser.nama_klinik}</div>
        </div>
        <div className='image-container'>
          <img src={adminBanner} alt='admin banner' />
        </div>
      </div>
      <div
        className='section-two'
        data-aos='fade-up'
        data-aos-duration='2000'
        data-aos-delay='500'
      >
        <div className='title'>Recent News</div>
        <NewsComponent
          image={
            "https://www.bpjsketenagakerjaan.go.id/newweb/images/icon-pembayaran/bank/bpjs-logo.png"
          }
          company={"BPJS Ketenagakerjaan"}
          news={"Penghapusan Kelas BPJS"}
          text={
            "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis."
          }
          date={"July 29, 2019"}
        />
        <NewsComponent
          image={
            "https://layanan-pusdatin.kemkes.go.id/layanan/img/logo-195-balitbangkes.png"
          }
          company={"Kementrian Kesehatan"}
          news={"Penghapusan Kelas BPJS"}
          text={
            "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis."
          }
          date={"July 29, 2019"}
        />
        <NewsComponent
          image={
            "https://www.bpjsketenagakerjaan.go.id/newweb/images/icon-pembayaran/bank/bpjs-logo.png"
          }
          company={"BPJS Ketenagakerjaan"}
          news={"Penghapusan Kelas BPJS"}
          text={
            "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis."
          }
          date={"July 29, 2019"}
        />
      </div>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
  .section-one {
    padding: 40px 40px;
    display: flex;
    gap: 45px;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    border-radius: 8px;

    .information {
      .title {
        font-weight: 700;
        font-size: 32px;
        line-height: 45px;
        color: #000000;
      }

      .subtitle {
        margin-top: 16px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
      }

      .button-container {
        width: max-content;
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
  }

  .section-two {
    background: white;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    .title {
      width: 100%;
      font-weight: 600;
      font-size: 16px;
      line-height: 14px;
      color: #000000;
      padding: 16px 16px;
    }
  }

  @media (max-width: 1000px) {
    margin-left: 0px;
    .section-one {
      flex-direction: column;
      .left {
        width: 100%;
      }

      .right {
        width: 100%;
      }
    }
  }
`;

export default DokterDashboard;
