import React, { useEffect } from "react";
import styled from "styled-components";

// import table
import PerizinanTable from "../../components/user/PerizinanTable";
// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const Perizinan = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <PerizinanContainer>
      <div
        className='alert alert-primary alert-dismissible fade show'
        role='alert'
        data-aos='fade-up'
        data-aos-duration='2000'
      >
        <strong>Attention!</strong> Only give permisiion for verified person!
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <PerizinanTable />
    </PerizinanContainer>
  );
};

const PerizinanContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
`;

export default Perizinan;
