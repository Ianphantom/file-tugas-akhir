import React, { useEffect } from "react";
import styled from "styled-components";

// import component
import RekamMedisTable from "../../components/user/RekamMedisTable";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const RekamMedis = () => {
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
      <RekamMedisTable />
    </RekamMedisContainer>
  );
};

const RekamMedisContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
`;

export default RekamMedis;
