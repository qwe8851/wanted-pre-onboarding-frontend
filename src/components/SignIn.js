import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from './hooks/use-input';

const SignIn = () => {
    const [submitResult, setSubmitResult] = useState(false);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput(value => value.includes("@"));

    const {
        value: enteredPw,
        isValid: enteredPwIsValid,
        hasError: pwInputHasError,
        valueChangeHandler: pwChangeHandler,
        inputBlurHandler: pwBlurHandler,
        reset: resetPwInput,
    } = useInput(value => value.trim().length >= 8);

    const emailInputChangeHandler = (event) => {
        emailChangeHandler(event);
        setSubmitResult(false);
    }

    const pwInputChangeHandler = (event) => {
        pwChangeHandler(event);
        setSubmitResult(false);
    }

    const formIsValid = enteredPwIsValid && enteredEmailIsValid;

    const navigate = useNavigate();
    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        if (!enteredEmailIsValid || !enteredPwIsValid) return;

        const result = await fetch('https://www.pre-onboarding-selection-task.shop/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPw,
            })
        });

        console.log(result);

        if (result.ok) {
            resetPwInput();
            resetEmailInput();

            navigate('/todo');
        } else {
            setSubmitResult(true);
        }
    };

    const pwInputClasses = pwInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <div className="app">
            <h1>Login</h1>
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
                        onChange={pwInputChangeHandler}
                        onBlur={pwBlurHandler}
                        value={enteredPw}
                        placeholder='password'
                    />
                    {pwInputHasError && <p className='error-text'>비밀번호가 올바르지 않습니다.</p>}
                </div>
                {submitResult && <p className='error-text'>이메일과 패스워드를 확인해주세요.</p>}
                <div className="form-actions">
                    <button data-testid="signin-button" disabled={!formIsValid} className='btn-submit'>로그인</button>
                    <button className='btn-white'>회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
