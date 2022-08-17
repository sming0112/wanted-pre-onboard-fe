import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  height: 44px;
  margin: 8px 0;
  padding: 11px 12px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const InputAtom = styled.input`
  width: 100%;
  background: transparent;
  line-height: 21px;
  font-size: 16px;
  font-weight: 400;
  border: 0;

  &::placeholder {
    color: #767676;
  }
`;

function Input({ type, text, onChange }) {
  return (
    <InputWrapper>
      <InputAtom
        name={type}
        type={type}
        placeholder={text}
        onChange={onChange}
      />
    </InputWrapper>
  );
}

export default Input;
