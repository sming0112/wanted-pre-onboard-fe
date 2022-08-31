import axios from "axios";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SignContext } from "../../../context";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  input {
    width: 24px;
    height: 24px;
    margin: 4px;
  }
`;

const TodoText = styled.span`
  width: 600px;
  height: 40px;
  line-height: 40px;
`;

const EditInput = styled.input`
  width: 600px;
  height: 40px;
  line-height: 40px;
  border: 0;
`;

const UDButton = styled.button`
  width: 80px;
  height: 40px;
  border: 0;
  background-color: ${props => props.bgcolor};
  cursor: pointer;
`;

function TodoItem({ id, todo, isCompleted }) {
  const [edit, setEdit] = useState(false);
  const [editingText, setEditingText] = useState(todo);
  const [isChecked, setIsChecked] = useState(isCompleted);

  const { setUpdate } = useContext(SignContext);

  const token = localStorage.getItem("token");

  const editTodoItem = () => {
    setEdit(true);
  };

  const cancelEditTodoItem = () => {
    setEdit(false);
  };

  const handleEditText = e => {
    setEditingText(e.target.value);
  };

  const handleCheckBox = () => {
    setIsChecked(prev => !prev);
  };

  const updateItem = () => {
    axios
      .put(
        `https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/todos/${id}`,
        {
          todo: editingText,
          isCompleted: isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        if (res.status === 200) {
          setUpdate(true);
          setEdit(false);
        }
      });
  };

  const deleteItem = () => {
    axios
      .delete(
        `https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        if (res.status === 204) {
          setUpdate(true);
          setEdit(false);
        }
      });
  };

  return (
    <TodoItemWrapper>
      <CheckBoxWrapper>
        <input type="checkbox" checked={isChecked} onChange={handleCheckBox} />
      </CheckBoxWrapper>
      {edit ? (
        <>
          <EditInput value={editingText} onChange={handleEditText} />
          <UDButton bgcolor="yellow" onClick={updateItem}>
            제출
          </UDButton>
          <UDButton bgcolor="gray" onClick={cancelEditTodoItem}>
            취소
          </UDButton>
        </>
      ) : (
        <>
          <TodoText>{todo}</TodoText>
          <UDButton bgcolor="green" onClick={editTodoItem}>
            수정
          </UDButton>
          <UDButton bgcolor="red" onClick={deleteItem}>
            삭제
          </UDButton>
        </>
      )}
    </TodoItemWrapper>
  );
}

export default TodoItem;
