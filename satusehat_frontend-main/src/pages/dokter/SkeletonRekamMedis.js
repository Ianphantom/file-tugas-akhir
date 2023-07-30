import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
import backArrow from "../../images/svg-icon/icon-back.svg";
// import DokterDetailRekamMedis from "./DokterDetailRekamMedis";
import SideBarProfile from "../../components/dokter/SideBarProfile";
// import RiwayatPenyakit from "../../components/dokter/RiwayatPenyakit";
// import aos
import AOS from "aos";
import "aos/dist/aos.css";
import { ENDPOINT } from "../../utils/apiEndpoint";

const SkeletonRekamMedis = () => {
  const url = useLocation().pathname.split("/");
  const [backComponent, setBackComponent] = useState(false);
  const navigate = useNavigate();
  const goBackButton = () => {
    navigate(-1);
  };

  const [userDataDetail, setUserDataDetail] = useState({});
  const { id } = useParams();

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

    fetch(`${ENDPOINT}/pasien/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setUserDataDetail(result[0]))
      .catch((error) => console.log("error", error));
  }, [id]);

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
      <div className='container'>
        {backComponent && (
          <div className='back' data-aos='fade-left' data-aos-duration='1500'>
            <img src={backArrow} alt='icon-back' onClick={goBackButton} />
            <div className='text'>Back To Previous</div>
          </div>
        )}

        <div className='main'>
          <div className='left-skeleton'>
            <SideBarProfile userDataDetail={userDataDetail} />
            {/* <RiwayatPenyakit /> */}
          </div>
          <div className='right-skeleton'>
            {/* <DokterDetailRekamMedis /> */}
            <Outlet />
          </div>
        </div>
      </div>
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled.div`
  /* background-color: #f8f8fb; */
  background: rgba(240, 244, 255, 0.5);
  /* background: white; */

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

export default SkeletonRekamMedis;
