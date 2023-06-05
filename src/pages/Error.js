import React from 'react';
import { useNavigate } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
    const navigate = useNavigate();

    function navigateHandler() {
        navigate('/');
    }

    return (
        <>
            <MainNavigation />
            <main>
                <h1>An error occurred!</h1>
                <p>존재하지 않는 페이지 입니다.</p>
                <p>
                    <button onClick={navigateHandler}>Go to Home</button>
                </p>
            </main>
        </>
    );
}

export default ErrorPage;