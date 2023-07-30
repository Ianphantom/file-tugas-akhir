import React, { useEffect } from "react";

import styled from "styled-components";

import ProfileCard from "../../components/user/ProfileCard";
import LastAppoinment from "../../components/user/LastAppoinment";
import NewsComponent from "../../components/user/NewsComponent";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <DashboardContainer>
      <div className='section-one'>
        <div className='left'>
          <ProfileCard />
        </div>
        <div className='right'>
          <LastAppoinment />
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
    display: flex;
    gap: 20px;
    justify-content: space-between;

    .left {
      width: 75%;
    }

    .right {
      width: 25%;
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

export default Dashboard;
