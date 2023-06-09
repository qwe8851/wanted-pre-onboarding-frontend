import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from './hooks/use-input';

const SignUp = () => {
    // 1. router이동을 위한 navigate 선언
    const navigate = useNavigate();
    
    // 2. useInput으로 email, pw별 필요한 변수 및 함수 정의
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes("@"));
    
    const {
        value: enteredPw,
        isValid: enteredPwIsValid,
        hasError: pwInputHasError,
        valueChangeHandler: pwChangeHandler,
        inputBlurHandler: pwBlurHandler,
        reset: resetPwInput
    } = useInput(value => value.trim().length >= 8);
    
    // 3. 회원가입 버튼 disable을 위한 상수 생성
    const formIsValid = enteredEmailIsValid && enteredPwIsValid;
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // 4. 회원가입 
    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        if (!enteredEmailIsValid || !enteredPwIsValid) return;
        
        const result = await fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPw,
            })
        });

        if (result.ok){
            resetEmailInput();
            resetPwInput();
            
            alert("회원가입이 완료되었습니다!");
            navigate('/signin');
        }else{
            const errorMessage = await result.json();

            setIsError(true);
            setErrorMessage(errorMessage.message);
        }
    };

    const emailInputChangeHandler = (event) => {
        emailChangeHandler(event);
        setIsError(false);
    }
    
    const pwChangeInputHandler = (event) => {
        pwChangeHandler(event);
        setIsError(false);
    }

    // etc. 동적 class 바인딩
    const emailInputClasses = emailInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const pwInputClasses = pwInputHasError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <div className="app">
            <h1>Join us!</h1>
            <form onSubmit={formSubmissionHandler}>
                <div className={emailInputClasses}>
                    <input
                        data-testid="email-input"
                        type='email'
                        onChange={emailInputChangeHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                        placeholder='email'
                    />
                    {emailInputHasError && <p className='error-text'>이메일이 올바르지 않습니다.</p>}
                </div>
                <div className={pwInputClasses}>
                    <input
                        data-testid="password-input"
                        type='password'
                        onChange={pwChangeInputHandler}
                        onBlur={pwBlurHandler}
                        value={enteredPw}
                        placeholder='password'
                    />
                    {pwInputHasError && <p className='error-text'>비밀번호가 올바르지 않습니다.</p>}
                </div>
                {isError && <p className='error-text'>{errorMessage}</p>}
                <div className="form-actions">
                    <button data-testid="signup-button" className='btn-submit' disabled={!formIsValid}>회원가입</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;