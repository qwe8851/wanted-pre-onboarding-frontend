import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import classes from './Todo.module.css';

const StyledButton = styled.button`
    width: auto;
    padding: 1px 10px;
    font-size: small;
`;

const Todo = (props) => {
    const demo_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlQG5hdmVyLmNvbSIsInN1YiI6OTIwLCJpYXQiOjE2ODU5NzI0OTEsImV4cCI6MTY4NjU3NzI5MX0.jmAN8DPxXvl_5KBHqeyFPr73wVDVR1CghFAUn7mh7rE';
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const addTodoInput = useRef();

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
            console.log(error.message);
            setIsLoading(false);
            setHttpError('Something went wrong!');
        });
    }

    useEffect(() => {
        getTodoListData();
    }, []);

    const addItemHandler = async (item) => {
        try {
            const request = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + demo_access_token
                },
                body: JSON.stringify({
                    "todo": addTodoInput.current.value
                })
            });

            if (!request.ok) {
                throw new Error('데이터를 추가하는데 실패하였습니다.');
            }

            const data = await request.json();   // JSON 형태로 변환된 데이터를 받음
            console.log(data);                  // 결과값 출력

            getTodoListData();
        } catch (error) {
            console.log(error);
        }
    };

    const editItemHandler = async (event) => {
        // todoCtx.editItem(id);

        // const id = event.target.id;
        // const request = await fetch('https://www.pre-onboarding-selection-task.shop/todos/' + id, {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': 'Bearer ' + demo_access_token,
        //         'Content-Type': 'application/json',
        //     }, 
        //     body: JSON.stringify({
        //         todo: ,
        //         isCompleted: 
        //     })
        // });

        // if (request.ok) {
        //     console.log("수정 성공");
        // } else {
        //     console.log("수정 실패");
        // }
    };

    const removeItemHandler = async (id) => {
        console.log(id);
        
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


    // if (isLoading) {
    //     return <p class="error-text" >Loading...</p>;
    // }

    // if (httpError) {
    //     return <p class="error-text" >{httpError}</p>;
    // }

    const showTodoList = <div className={classes['todo-list']}>
        <ul>{todoList.map((item) => (
            <li key={item.id}>
                <label>
                    <input type="checkbox" />
                    <span>{item.todo}</span>
                </label>
                <div>
                    <StyledButton data-testid="modify-button" onClick={editItemHandler}>수정</StyledButton>
                    <StyledButton data-testid="delete-button" onClick={()=> removeItemHandler(item.id)} >삭제</StyledButton>
                </div>
                {/* 
                <input data-testid="modify-input" />
                <StyledButton data-testid="submit-button" onClick={submitItemHandler}>제출</StyledButton>
                <StyledButton data-testid="cancel-button" onClick={submitItemHandler}>취소</StyledButton>
            */}
            </li>
        ))}</ul>
    </div>;
    


    return (
        <>
            <div className={`app ${classes['width-rem-35']}`}>
                <h1>Todo</h1>
                <div className='form-control' style={{ display: 'flex', gap: '10px' }}>
                    <input data-testid="new-todo-input" className='form-control' style={{ flex: "1" }} ref={addTodoInput} />
                    <button
                        data-testid="new-todo-add-button"
                        className='btn-small'
                        style={{ height: "fit-content" }}
                        onClick={addItemHandler}>추가</button>
                </div>
                {/* <p class="error-text">할 일을 입력해주세요.</p> */}
                {isLoading && !httpError && <p style={{ color: "black" }}>Loading...</p>}
                {httpError && !isLoading && <p style={{ color: "red" }}>{httpError}</p>}
                {!httpError && !isLoading && showTodoList}
            </div>
        </>
    );
}

export default Todo;