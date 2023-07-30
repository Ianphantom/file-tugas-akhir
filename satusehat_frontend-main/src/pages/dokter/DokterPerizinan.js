import styled from "styled-components";
// import component
import AdminPerizinanTable from "../../components/admin/AdminPerizinanTable";

const DokterPerizinan = () => {
  return (
    <PerizinanContainer>
      <AdminPerizinanTable />
    </PerizinanContainer>
  );
};

const PerizinanContainer = styled.div`
  margin-top: 40px;
`;

export default DokterPerizinan;
