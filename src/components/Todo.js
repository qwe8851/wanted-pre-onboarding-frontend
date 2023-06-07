import { useEffect, useState } from 'react';

import classes from './Todo.module.css';
import styled from 'styled-components';
import useInput from './hooks/use-input';

const StyledButton = styled.button`
    width: auto;
    padding: 1px 10px;
    font-size: small;
`;

const BtnDiv = styled.div`
    width: 100px;
    display: flex;
    justify-content: space-between;
    right: 5px;
    top: 5px;
    position: absolute;
`;

const Todo = (props) => {
    const demo_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlQG5hdmVyLmNvbSIsInN1YiI6OTIwLCJpYXQiOjE2ODU5NzI0OTEsImV4cCI6MTY4NjU3NzI5MX0.jmAN8DPxXvl_5KBHqeyFPr73wVDVR1CghFAUn7mh7rE';
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [modifyInputValue, setModifyInputValue] = useState('');

    const {
        value: enteredAddInput,
        isValid: enteredAddInputIsValid,
        hasError: addInputHasError,
        valueChangeHandler: addInputChangeHandler,
        inputBlurHandler: addInputBlurHandler,
        reset: resetAddInputInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredModifyInput,
        isValid: enteredModifyInputIsValid,
        hasError: modifyInputHasError,
        valueChangeHandler: modifyInputChangeHandler,
        inputBlurHandler: modifyInputBlurHandler,
    } = useInput((value) => value.trim() !== '');

    const getTodoListData = async () => {
        const fetchTodoList = async () => {
            const response = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + demo_access_token
                }
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            setIsLoading(false);
            setTodoList(responseData);
        };

        fetchTodoList().catch((error) => {
            setIsLoading(false);
            setHttpError('Something went wrong!');
        });
    }

    useEffect(() => {
        getTodoListData();
    }, []);

    const addItemHandler = async () => {
        try {
            const request = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + demo_access_token
                },
                body: JSON.stringify({
                    todo: enteredAddInput
                })
            });

            if (!request.ok) {
                throw new Error('데이터를 추가하는데 실패하였습니다.');
            }

            const data = await request.json();  // JSON 형태로 변환된 데이터를 받음
            console.log(data);                  // 결과값 출력

            resetAddInputInput();
            getTodoListData();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleEditItemHandler = (item) => {
        setIsEdit((prevState) => !prevState);
        setModifyInputValue(item.todo);
    };

    const removeItemHandler = async (id) => {
        const result = await fetch('https://www.pre-onboarding-selection-task.shop/todos/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + demo_access_token
            },
        });

        if (result.ok) {
            console.log("삭제 성공");
            getTodoListData();
        } else {
            console.log("삭제 실패");
        }
    };

    const submitItemHandler = async (id) => {
        //     setIsSubmitting(true);
        //     todoCtx.editItem(id);
    };

    const editCompo = (item) => (
        <div style={{ position: "relative" }}>
            <input type="checkbox" />
            <input
                data-testid="modify-input"
                className={classes['form-control-sm']}
                type="text"
                onChange={modifyInputChangeHandler}
                onBlur={modifyInputBlurHandler}
                value={enteredModifyInput}
            />
            <BtnDiv>
                <StyledButton data-testid="submit-button" onClick={submitItemHandler}>제출</StyledButton>
                <StyledButton data-testid="cancel-button" onClick={() => toggleEditItemHandler(item)}>취소</StyledButton>
            </BtnDiv>
        </div>
    );

    const addInputClasses = addInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const showTodoList = (
        <div className={classes['todo-list']}>
            {todoList.map((item) => (
                <ul key={item.id}>
                    {isEdit ? editCompo(item) : (
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>{item.todo}</span>
                            </label>
                            <BtnDiv>
                                <StyledButton data-testid="modify-button" onClick={() => toggleEditItemHandler(item)}>수정</StyledButton>
                                <StyledButton data-testid="delete-button" onClick={() => removeItemHandler(item.id)} >삭제</StyledButton>
                            </BtnDiv>
                        </li>
                    )}
                </ul >
            ))}
        </div >
    )

    return (
        <>
            <div className={`app ${classes['width-rem-35']}`}>
                <h1>Todo</h1>
                <div className={addInputClasses} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        data-testid="new-todo-input"
                        style={{ flex: "1" }}
                        type='text'
                        onChange={addInputChangeHandler}
                        onBlur={addInputBlurHandler}
                        value={enteredAddInput}
                    />
                    <button
                        data-testid="new-todo-add-button"
                        className='btn-small btn-submit'
                        style={{ height: "fit-content" }}
                        onClick={addItemHandler}
                        disabled={!enteredAddInputIsValid}>추가</button>
                </div>
                {addInputHasError && <p class="error-text">할 일을 입력해주세요.</p>}
                {!httpError && !isLoading && showTodoList}
                {isLoading && !httpError && <p style={{ color: "black" }}>Loading...</p>}
                {httpError && !isLoading && <p style={{ color: "red" }}>{httpError}</p>}
            </div>
        </>
    );
}

export default Todo;