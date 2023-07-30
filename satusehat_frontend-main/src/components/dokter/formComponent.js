import InputComponent from "../input/input.component";
import styled from "styled-components";

const FormComponent = ({ label, type, placeholder, ...rest }) => {
  return (
    <FormComponentContainer>
      <div className='label'>{label}</div>
      <InputComponent type={type} placeholder={placeholder} {...rest} />
    </FormComponentContainer>
  );
};

const FormComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .label {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #001737;
  }
`;

export default FormComponent;
