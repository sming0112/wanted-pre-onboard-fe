import React, { useEffect, useContext } from "react";
import Button from "./Button";
import Input from "./Input";
import styled from "styled-components";
import { SignContext } from "../../../context";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 380px;
  height: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const FormTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const AdditionInfo = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #8c8c8c;

  span {
    color: #3367ff;
    cursor: pointer;
  }
`;

function Form({ type, title, inputData }) {
  const {
    setSignup,
    email,
    setEmail,
    password,
    setPassword,
    hasValidation,
    setHasValidation,
  } = useContext(SignContext);

  const changeIntoSignin = () => {
    setSignup(false);
  };
  const changeIntoSignup = () => {
    setSignup(true);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const emailValidation = email.includes("@");

  const passwordValidation = password.length >= 8;

  const loginValidation = () => {
    if (emailValidation && passwordValidation) {
      return setHasValidation(true);
    } else {
      return setHasValidation(false);
    }
  };

  useEffect(() => {
    loginValidation();
  });

  return (
    <FormWrapper>
      <FormTitle>{title}</FormTitle>
      <div>
        {inputData.map((input, idx) => (
          <Input
            key={idx}
            type={input.type}
            text={input.text}
            onChange={idx === 0 ? handleEmail : handlePassword}
          />
        ))}
      </div>
      <Button
        color={hasValidation ? "#3367ff" : "#bbb"}
        value={title}
        disabled={!hasValidation}
      />
      {type === "signUp" ? (
        <AdditionInfo>
          이미 가입하셨나요? <span onClick={changeIntoSignin}>로그인</span>
        </AdditionInfo>
      ) : (
        <AdditionInfo>
          회원이 아니신가요? <span onClick={changeIntoSignup}>회원가입</span>
        </AdditionInfo>
      )}
    </FormWrapper>
  );
}

export default Form;
