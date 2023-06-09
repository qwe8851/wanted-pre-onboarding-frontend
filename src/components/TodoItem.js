import React, { useEffect, useRef, useState } from 'react';

import classes from './Todo.module.css';

const TodoItem = (props) => {
    const modifyRef = useRef(null);

    const [isEdit, setIsEdit] = useState(false);
    const [modifyValue, setModifyValue] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    // 1. 수정버튼 클릭 시 input value 초기값을 위한 useEffect
    useEffect(() => {
        setModifyValue(props.todoItem.todo);
    }, [props.todoItem.todo]);

    // 2-1. 수정/취소버튼
    const toggleEditItemHandler = () => {
        setIsEdit((prevState) => !prevState);
    };

    // 2-2. 수정 버튼 클릭 후 input요소가 변경되면 modifyValue 업데이트
    const modifyChangeHandler = (event) => {
        const value = event.target.value;

        setModifyValue(value);
        setIsSubmitDisabled(value.trim() === ''); // 비동기처리로 인해 이전 값(value) 사용
    }

    // 2-3. 제출버튼
    const onSubmit = () => {
        props.onSubmit(props.todoItem.id, modifyValue); // Todo에서 처리
        setIsEdit(false);
    }

    const modifyKeyPressHandler = (event) => {
        if (event.key === 'Enter' && modifyValue) {
            onSubmit();
        }
    }

    return (
        <ul key={props.todoItem.id}>
            <li>
                <label>
                    <input type="checkbox" />
                    {!isEdit
                        ? <span>{props.todoItem.todo}</span>
                        : <input
                            data-testid="modify-input"
                            type="text"
                            className={classes['form-control-sm']}
                            onKeyPress={modifyKeyPressHandler}
                            onChange={(event) => modifyChangeHandler(event)}
                            value={modifyValue}
                            ref={modifyRef}
                        />
                    }
                </label>
                <div className={classes['btn-div']}>
                    {!isEdit &&<>
                        <button className={classes['btn-item']} data-testid="modify-button" onClick={() => toggleEditItemHandler(props.todoItem.todo)}>수정</button>
                        <button className={classes['btn-item']} data-testid="delete-button" onClick={() => props.onRemove(props.todoItem.id)} >삭제</button>
                    </>}
                    {isEdit &&<>
                        <button
                            className={classes['btn-item']}
                            data-testid="submit-button"
                            onClick={onSubmit}
                            disabled={isSubmitDisabled}
                        >제출</button>
                        <button className={classes['btn-item']} data-testid="cancel-button" onClick={toggleEditItemHandler}>취소</button>
                    </>}
                </div>
            </li>
        </ul >
    );
}

export default TodoItem;