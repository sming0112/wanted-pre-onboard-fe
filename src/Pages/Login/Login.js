import React, { useContext } from "react";
import Form from "./Components/Form";
import styled from "styled-components";
import { SignContext } from "../../context";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function Login() {
  const { signup } = useContext(SignContext);

  const DATA = [
    {
      type: "email",
      text: "이메일",
    },
    {
      type: "password",
      text: "비밀번호",
    },
  ];

  return (
    <ModalWrapper>
      {signup ? (
        <Form type="signUp" title="회원가입" inputData={DATA} />
      ) : (
        <Form type="signIn" title="로그인" inputData={DATA} />
      )}
    </ModalWrapper>
  );
}

export default Login;
