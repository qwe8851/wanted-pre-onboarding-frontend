import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from './hooks/use-input';

const SignIn = () => {
    // 1. router이동을 위한 navigate 선언
    const navigate = useNavigate();

    // 2. submit 성공 여부와 에러메시지 state 선언 
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    // 3. useInput으로 email, pw별 필요한 변수 및 함수 정의
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

    // 4. 로그인버튼 disable을 위한 상수 생성
    const formIsValid = enteredPwIsValid && enteredEmailIsValid;

    // 5. email, pw 변경 시 useInput으로 event 전송 (useInput에서 처리)
    const emailInputChangeHandler = (event) => {
        emailChangeHandler(event);
        setIsSubmitSuccess(false);
    }

    const pwInputChangeHandler = (event) => {
        pwChangeHandler(event);
        setIsSubmitSuccess(false);
    }

    // 6. 로그인
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

        if (result.ok) {
            // input 초기화
            resetPwInput();
            resetEmailInput();
            
            // 로컬스토리지에 토큰 저장
            const responseData = await result.json();
            window.localStorage.setItem("access_token", responseData.access_token);

            navigate('/todo');
        } else {
            const resultCode = await result.json();
            result.status === 404 
                ? setErrorMessage(resultCode.message)
                : setErrorMessage("이메일과 패스워드를 확인해주세요.");
            
            setIsSubmitSuccess(true);
        }
    };

    // etc. 동적 class 바인딩
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
                {isSubmitSuccess && <p className='error-text'>{errorMessage}</p>}
                <div className="form-actions">
                    <button data-testid="signin-button" disabled={!formIsValid} className='btn-submit'>로그인</button>
                    <button className='btn-white' onClick={() => navigate('/signup')}>회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
