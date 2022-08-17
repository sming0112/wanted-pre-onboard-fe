import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TodoItem from "./Components/TodoItem";
import { SignContext } from "../../context";
import axios from "axios";

const TodoFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 802px;
  border: 1px solid #ddd;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #3367ff;

  h1 {
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
  }
`;

const AddItems = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
`;

const AddItemInput = styled.input`
  width: 640px;
  height: 100%;
  border: 0;
  background-color: #f2f2f2;

  ::placeholder {
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const AddItemButton = styled.button`
  width: 160px;
  height: 100%;
  border: 0;
  color: #eee;
  background-color: #a3a3a3;
  cursor: pointer;
`;

const TodoList = styled.div`
  width: 100%;
`;

function Todo() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  const { update, setUpdate, access_token } = useContext(SignContext);

  useEffect(() => {
    axios(
      "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    ).then(res => setList(res.data));
    setUpdate(false);
  }, [update]);

  const handleAddItemInput = e => {
    setText(e.target.value);
  };

  const resetInput = () => {
    setText("");
  };

  const addTodoItem = () => {
    axios
      .post(
        "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
        {
          todo: text,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(setUpdate(true));
    resetInput();
  };

  return (
    <TodoFormWrapper>
      <Wrapper>
        <TitleWrapper>
          <h1>Todo</h1>
        </TitleWrapper>
        <AddItems>
          <AddItemInput
            placeholder="할 일을 입력하세요"
            value={text}
            onChange={handleAddItemInput}
          />
          <AddItemButton onClick={addTodoItem}>추가</AddItemButton>
        </AddItems>
        <TodoList>
          {list.map((todo, idx) => (
            <TodoItem
              key={idx}
              id={todo.id}
              todo={todo.todo}
              isCompleted={todo.isCompleted}
            />
          ))}
        </TodoList>
      </Wrapper>
    </TodoFormWrapper>
  );
}

export default Todo;
