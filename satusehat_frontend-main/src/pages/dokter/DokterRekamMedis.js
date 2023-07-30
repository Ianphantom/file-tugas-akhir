import React, { useEffect } from "react";
import styled from "styled-components";

// import component
import DokterRekamMedisTable from "../../components/dokter/DokterRekamMedisTable";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const DokterRekamMedis = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <RekamMedisContainer>
      <div
        className='alert alert-primary alert-dismissible fade show'
        role='alert'
        data-aos='fade-up'
        data-aos-duration='2000'
      >
        <strong>Attention!</strong> Never give your private key to anyone
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <DokterRekamMedisTable />
    </RekamMedisContainer>
  );
};

const RekamMedisContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
`;

export default DokterRekamMedis;
