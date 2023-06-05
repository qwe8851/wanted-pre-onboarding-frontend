import React from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from './hooks/use-input';

const SignUp = () => {
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

    const formIsValid = enteredEmailIsValid && enteredPwIsValid;

    const navigate = useNavigate();
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

        console.log(result);

        if (result.ok){
            resetEmailInput();
            resetPwInput();
            
            alert("회원가입이 완료되었습니다!");
            navigate('/signin');
        }else{
            alert("이미 가입된 이메일입니다.");
        }
    };

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
                        onChange={emailChangeHandler}
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
                        onChange={pwChangeHandler}
                        onBlur={pwBlurHandler}
                        value={enteredPw}
                        placeholder='password'
                    />
                    {pwInputHasError && <p className='error-text'>비밀번호가 올바르지 않습니다.</p>}
                </div>
                <div className="form-actions">
                    <button data-testid="signup-button" disabled={!formIsValid} className='btn-submit'>회원가입</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;