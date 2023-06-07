import React, { useState } from 'react';

import styled from 'styled-components';
import classes from './Todo.module.css';

const StyledButton = styled.button`
    width: auto;
    padding: 1px 10px;
    font-size: small;
`;

const BtnDiv = styled.div`
    width: 100px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 5px;
    top: 5px;
`;

const TodoItem = (props) => {
    const [isEdit, setIsEdit] = useState(false);

    const toggleEditItemHandler = (item) => {
        setIsEdit((prevState) => !prevState);

        if(!isEdit){
            console.log("item.id : ", item.id);
        }
    };

    const submitItemHandler = () => {
        // props.onModify(props.item.id, inputValue);
        // toggleEditItemHandler();
    };

    // const inputChangeHandler = (event) => {
    //     setInputValue(event.target.value);
    // };

    const editCompo = (item) => (
        <li>
            <div style={{ position: "relative" }}>
                <input type="checkbox" />
                <input
                    data-testid="modify-input"
                    className={classes['form-control-sm']}
                    id={item.id}
                    type="text"
                    // value={initialInput}
                />
            </div>
            <BtnDiv>
                <StyledButton data-testid="submit-button" onClick={submitItemHandler}>제출</StyledButton>
                <StyledButton data-testid="cancel-button" onClick={toggleEditItemHandler}>취소</StyledButton>
            </BtnDiv>
        </li>
    );

    return (
        <div className={classes['todo-list']}>
            {props.todoList.map((item) => (
                <ul key={item.id}>
                    {isEdit ? editCompo(item) : (
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>{item.todo}</span>
                            </label>
                            <BtnDiv>
                                <StyledButton data-testid="modify-button" onClick={() => toggleEditItemHandler(item)}>수정</StyledButton>
                                <StyledButton data-testid="delete-button" onClick={() => props.onRemove(item.id)} >삭제</StyledButton>
                            </BtnDiv>
                        </li>
                    )}
                </ul >
            ))}
        </div >
    );
}

export default TodoItem;