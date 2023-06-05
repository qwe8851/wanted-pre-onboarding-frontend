import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <p><Link to="/signin">로그인</Link>하러 가기</p>
            <p><Link to="/signup">회원가입</Link>하러 가기</p>
        </>
    );
}

export default HomePage;