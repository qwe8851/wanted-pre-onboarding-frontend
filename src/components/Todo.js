import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import classes from './Todo.module.css';

const StyledButton = styled.button`
    width: auto;
    padding: 1px 10px;
    font-size: small;
`;

const Todo = (props) => {
    const [todoList, setTodoList] = useState([]);
    const demo_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlQG5hdmVyLmNvbSIsInN1YiI6OTIwLCJpYXQiOjE2ODU5NzI0OTEsImV4cCI6MTY4NjU3NzI5MX0.jmAN8DPxXvl_5KBHqeyFPr73wVDVR1CghFAUn7mh7rE';
    const addTodoInput = useRef();

    useEffect(() => {
        const getTodoListData = async () => {
            const response = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + demo_access_token
                }
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }

            const responseData = await response.json();

            console.log(responseData);
            setTodoList(responseData);
        }

        getTodoListData().catch((error) => {
            console.log("error : ", error);
        });
    }, []);

    const addItemHandler = async (item) => {
        console.log(addTodoInput.current.value);
        const result = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + demo_access_token
            },
            body: JSON.stringify({
                "todo": addTodoInput.current.value
            })
        });

        const data = await result.json();   // JSON 형태로 변환된 데이터를 받음
        console.log(data);                  // 결과값 출력

        if (result.ok) {
            console.log("성공 ");
        } else {
            console.log("실패");
        }
    };

    const editItemHandler = (id) => {
        // todoCtx.editItem(id);
    };

    const removeItemHandler = async (event) => {
        // todoCtx.removeItem(id);
        const id = event.target.id;
        const result = await fetch('https://www.pre-onboarding-selection-task.shop/todos/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + demo_access_token
            },
        });

        if (result.ok) {
            console.log("삭제 성공");
        } else {
            console.log("삭제 실패");
        }
    };

    // const submitItemHandler = async(id) => {
    //     setIsSubmitting(true);
    //     todoCtx.editItem(id);
    // };

    // const removeItemHandler = (id) => {
    // todoCtx.removeItem(id);
    // await fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
    //     method: 'POST',
    //     body
    // })
    // };

    return (
        <>
            <div className={`app ${classes['width-rem-35']}`}>
                <h1>Todo</h1>
                <div className='form-control' style={{ display: 'flex', gap: '10px' }}>
                    <input data-testid="new-todo-input" className='form-control' style={{ flex: "1" }} ref={addTodoInput}/>
                    <button
                        data-testid="new-todo-add-button"
                        className='btn-small'
                        style={{ height: "fit-content" }}
                        onClick={addItemHandler}>추가</button>
                </div>
                {/* <p class="error-text">할 일을 입력해주세요.</p> */}
                <div className={classes['todo-list']}>
                    <ul>
                        {
                            todoList.map((item) => (
                                <li key={item.id}>
                                    <label>
                                        <input type="checkbox" />
                                        <span>{item.todo}</span>
                                    </label>
                                    <div>
                                        <StyledButton data-testid="modify-button" onClick={editItemHandler}>수정</StyledButton>
                                        <StyledButton data-testid="delete-button" onClick={removeItemHandler} id={item.id}>삭제</StyledButton>
                                    </div>
                                    {/* 
                                        <input data-testid="modify-input" />
                                        <StyledButton data-testid="submit-button" onClick={submitItemHandler}>제출</StyledButton>
                                        <StyledButton data-testid="cancel-button" onClick={submitItemHandler}>취소</StyledButton>
                                     */}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Todo;