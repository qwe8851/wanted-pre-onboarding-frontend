import React, { useEffect, useState } from 'react';

import TodoItem from './TodoItem';
import useInput from './hooks/use-input';

import classes from './Todo.module.css';

const TempTodo = (props) => {
    const demo_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlQG5hdmVyLmNvbSIsInN1YiI6OTIwLCJpYXQiOjE2ODU5NzI0OTEsImV4cCI6MTY4NjU3NzI5MX0.jmAN8DPxXvl_5KBHqeyFPr73wVDVR1CghFAUn7mh7rE';
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);

    const {
        value: enteredAddInput,
        isValid: enteredAddInputIsValid,
        hasError: addInputHasError,
        valueChangeHandler: addInputChangeHandler,
        inputBlurHandler: addInputBlurHandler,
        reset: resetAddInputInput
    } = useInput(value => value.trim() !== '');

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
    const addInputClasses = addInputHasError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <>
            <div className={`app ${classes['width-rem-35']}`}>
                <h1>Todo-demo</h1>
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
                {!httpError && !isLoading && <TodoItem todoList={todoList} onRemove={removeItemHandler }/>}
                {isLoading && !httpError && <p style={{ color: "black" }}>Loading...</p>}
                {httpError && !isLoading && <p style={{ color: "red" }}>{httpError}</p>}
            </div>
        </>
    );
}

export default TempTodo;