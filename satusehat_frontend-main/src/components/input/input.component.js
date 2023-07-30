import styled from "styled-components";

const InputComponent = ({ ...otherProps }) => {
  return (
    <InputComponentStyled>
      <input {...otherProps} />
    </InputComponentStyled>
  );
};

const InputComponentStyled = styled.div`
  input {
    width: 100%;
    padding: 15px 12px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #8f959e;
  }
`;

export default InputComponent;
