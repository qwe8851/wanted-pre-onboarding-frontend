import { useEffect, useState } from 'react';

import styled from 'styled-components';
import classes from './Todo.module.css';
// import TodoContext from '../store/todo-context';

const StyledButton = styled.button`
    width: auto;
    padding: 1px 10px;
    font-size: small;
`;

const Todo = (props) => {
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const todoCtx = useContext(TodoContext);
    const [todoList, setTodoList] = useState([]);
    const demo_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlQG5hdmVyLmNvbSIsInN1YiI6OTIwLCJpYXQiOjE2ODU5NzI0OTEsImV4cCI6MTY4NjU3NzI5MX0.jmAN8DPxXvl_5KBHqeyFPr73wVDVR1CghFAUn7mh7rE';

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
        // todoCtx.addItem(item);

        const result = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + demo_access_token
            },
            body: JSON.stringify({
                "todo": "todo"
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

    const removeItemHandler = (id) => {
        // todoCtx.removeItem(id);
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
                <h1>todo</h1>
                <div className='form-control' style={{ display: 'flex', gap: '10px' }}>
                    <input data-testid="new-todo-input" className='form-control' style={{ flex: "1" }} />
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
                                        <StyledButton onClick={editItemHandler}>수정</StyledButton>
                                        <StyledButton onClick={removeItemHandler}>삭제</StyledButton>
                                    </div>
                                    {/* <div>
                                        <StyledButton onClick={submitItemHandler}>제출</StyledButton>
                                        <StyledButton onClick={cancelItemHandler}>취소</StyledButton>
                                    </div> */}
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