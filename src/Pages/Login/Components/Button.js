import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { SignContext } from "../../../context";
import { useNavigate } from "react-router-dom";

const ButtonAtom = styled.button`
  text-align: center;
  height: 44px;
  margin-top: 16px;
  padding: 14px;
  font-size: 16px;
  background: ${props => props.color};
  color: #ffffff;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
`;

function Button(props) {
  const { signup, email, password } = useContext(SignContext);

  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    axios
      .post(
        "https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/auth/signin",
        { email, password }
      )
      .then(res => {
        if (res.data.access_token) {
          localStorage.setItem("token", res.data.access_token);
          navigate("/todo");
        }
      })
      .catch(err => alert("로그인 실패!"));
  };

  const handleSignup = e => {
    e.preventDefault();
    axios
      .post(
        "https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/auth/signup",
        { email, password }
      )
      .then(res => {
        if (res.data.access_token) {
          localStorage.setItem("token", res.data.access_token);
          alert("회원가입 성공! Todo 페이지로 이동합니다.");
          navigate("/todo");
        }
      })
      .catch(err => alert("회원가입 실패!"));
  };

  return (
    <ButtonAtom
      {...props}
      disabled={props.disabled}
      onClick={signup ? handleSignup : handleLogin}
    >
      {props.value}
    </ButtonAtom>
  );
}

export default Button;
