import React, { useEffect, useRef, useState } from 'react';

import classes from './Todo.module.css';

const TodoItem = (props) => {
    const modifyRef = useRef(null);

    const [isEdit, setIsEdit] = useState(false);
    const [modifyValue, setModifyValue] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    useEffect(()=>{
        setModifyValue(props.todoItem.todo);
    }, [props.todoItem.todo]);

    const toggleEditItemHandler = () => {;
        setIsEdit((prevState) => !prevState);
    };

    const modifyChangeHandler = (event) => {
        const value = event.target.value;

        setModifyValue(value);
        setIsSubmitDisabled(value.trim() === ''); // 비동기처리로 인해 이전 값(value) 사용
    }

    const onSubmit = () => {
        props.onSubmit(props.todoItem.id, modifyValue);
        setIsEdit(false);
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
                            className={classes['form-control-sm']}
                            type="text"
                            onChange={(event) => modifyChangeHandler(event)}
                            value={modifyValue}
                            // onChange={(event) => setModifyValue(event.target.value)}
                            ref={modifyRef}
                        />
                    }
                </label>
                <div className={classes['btn-div']}>
                    {!isEdit
                        ? <>
                            <button className={classes['btn-item']} data-testid="modify-button" onClick={() => toggleEditItemHandler(props.todoItem.todo)}>수정</button>
                            <button className={classes['btn-item']} data-testid="delete-button" onClick={() => props.onRemove(props.todoItem.id)} >삭제</button>
                        </>
                        : <>
                            <button 
                                className={classes['btn-item']} 
                                data-testid="submit-button" 
                                onClick={onSubmit} 
                                disabled={isSubmitDisabled}
                            >제출</button>
                            <button className={classes['btn-item']} data-testid="cancel-button" onClick={toggleEditItemHandler}>취소</button>
                        </>
                    }
                </div>
            </li>
        </ul >
    );
}

export default TodoItem;