import React, { useEffect, useState } from 'react';

import TodoItem from './TodoItem';
import useInput from './hooks/use-input';

import classes from './Todo.module.css';

const Todo = () => {
    // 1. 로그인 후 로컬스토리지에 저장된 토큰 가져오기
    const access_token = window.localStorage.getItem('access_token');

    // 2. 토큰을 이용해 가져온 todo list, 로딩 및 에러를 처리할 state 생성
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);

    // 3. custom hooks를 이용한 useInput으로 변수 및 함수 정의
    const {
        value: enteredAddInput,
        isValid: enteredAddInputIsValid,
        hasError: addInputHasError,
        valueChangeHandler: addInputChangeHandler,
        inputBlurHandler: addInputBlurHandler,
        reset: resetAddInputInput
    } = useInput(value => value.trim() !== '');

    // 4. 컴포넌트 렌더링 시 input에 초기값 바인딩을 위한 useEffect
    useEffect(() => {
        getTodoListData();
    }, []);

    // 5-1. todo list 가져오기
    const getTodoListData = async () => {
        const fetchTodoList = async () => {
            const response = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            });

            if (!response.ok) {
                throw new Error('로그인을 완료해주세요!');
            }

            const responseData = await response.json();

            setIsLoading(false);
            setTodoList(responseData);
        };

        fetchTodoList().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }

    // 5-2. todo list 추가
    const addItemHandler = async () => {
        const request = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({
                todo: enteredAddInput
            })
        });

        if (request.ok) {
            resetAddInputInput();
            getTodoListData();
        } else {
            alert('데이터를 추가하는데 실패하였습니다.');
        }
    };

    // 5-3. todo list 삭제
    const removeItemHandler = async (id) => {
        const result = await fetch('https://www.pre-onboarding-selection-task.shop/todos/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
        });

        if (result.ok) {
            getTodoListData();
        } else {
            alert('데이터를 삭제하는데 실패하였습니다.');
        }
    };

    // 5-4. todo list 수정
    const submitItemHandler = async (id, modifyValue) => {
        const result = await fetch('https://www.pre-onboarding-selection-task.shop/todos/' + id, {
            method: 'PUT',
            headers: {
                'Authorization': 'bearer ' + access_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                todo: modifyValue,
                isCompleted: true
            })
        })

        if (result.ok) {
            getTodoListData();
        } else {
            alert('데이터를 수정하는데 실패하였습니다.');
        }
    }

    // etc. input에서 enter 시 input요소를 todo list에 추가
    const keyPressHandler = (event) => {
        if (event.key === 'Enter' && enteredAddInputIsValid) {
            addItemHandler();
        }
    }

    // etc. 오류에 따른 동적 class 바인딩
    const addInputClasses = addInputHasError
        ? 'form-control invalid'
        : 'form-control';

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
                        onKeyPress={keyPressHandler}
                        value={enteredAddInput}
                    />
                    <button
                        data-testid="new-todo-add-button"
                        className='btn-small btn-submit'
                        style={{ height: "fit-content" }}
                        onClick={addItemHandler}
                        disabled={!enteredAddInputIsValid}>
                        추가
                    </button>
                </div>
                {addInputHasError && <p class="error-text">할 일을 입력해주세요.</p>}
                {isLoading && !httpError && <p style={{ color: "black" }}>Loading...</p>}
                {httpError && !isLoading && <p style={{ color: "red" }}>{httpError}</p>}
                {!httpError && !isLoading &&
                    <div className={classes['todo-list']}>
                        {todoList.map((todoItem) => (
                            <ul key={todoItem.id}>
                                <TodoItem todoItem={todoItem} onRemove={removeItemHandler} onSubmit={submitItemHandler} />
                            </ul>
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default Todo;