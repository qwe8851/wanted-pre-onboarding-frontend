# 🤔 원티드 프리온보딩 프론트엔드 - 선발과제
## ✨ 지원자정보
송승희

<br/><br/>

## ✨ 프로젝트 실행 방법
- `npm install` <br/>
- `npm start`

<br/><br/>

## ✨ 데모영상
### 1. 로그인 시
![01_로그인_오류메시지](https://github.com/qwe8851/wanted-pre-onboarding-frontend/assets/101406386/f4177552-de9d-4ff0-a0ca-416748c2c797)
- 메인화면에서 `로그인하러 가기`를 클릭해 로그인페이지로 이동
- 이메일과 패스워드의 값이 모두 조건에 부합하면 로그인 버튼 활성화
    - 이메일 : (@)포함
    - 패스워드 : 8자 이상
    - 이메일과 패스워드 미입력 시 오류 출력
- 로그인 버튼 클릭 시 
    - 로그인 성공 시 : todo 페이지로 이동 
    - 로그인 실패 시 : 오류메시지 출력 (이메일과 패스워드를 확인해주세요, 해당사용자가 존재하지 않습니다.) 
- `회원가입버튼` 클릭 시 회원가입페이지로 이동 

<br/><br/>


## 2. 회원가입 시
![02_회원가입_에러메시지및로그인](https://github.com/qwe8851/wanted-pre-onboarding-frontend/assets/101406386/ac3ab436-16e8-4bdf-91c6-02569717f20f)
- 이메일과 패스워드의 값이 모두 조건에 부합하면 회원가입 버튼 활성화
    - 이메일 : (@)포함
    - 패스워드 : 8자 이상
    - 이메일과 패스워드 미입력 시 오류 출력
- 회원가입 버튼 클릭 시 
    - 회원가입 성공 시 : 회원가입 성공 알림과 함께 로그인페이지로 이동
    - 회원가입 실패 시 : 오류메시지 출력 (동일한 이메일이 이미 존재합니다.)


<br/><br/>

## 3. 로그인 성공 시 로컬스토리지에 토큰 저장
![03_로그인_토큰저장및todo오류메시지](https://github.com/qwe8851/wanted-pre-onboarding-frontend/assets/101406386/ceee37cf-7d0a-47d8-8665-945c6d255934)
- 로그인 성공 시 로컬스토리지에 토큰 저장 후 todo페이지로 이동
    - todo 페이지에서 로컬스토리지에 저장된 토큰으로 crud를 처리함 
    - 만약 로컬스토리지에 저장된 토큰이 없을 경우 오류 메시지 출력 (로그인을 완료해주세요!)


<br/><br/>

## 4. todo 페이지
![04_todo_기능구현](https://github.com/qwe8851/wanted-pre-onboarding-frontend/assets/101406386/48a83fe8-7715-4c5b-987c-07aaa52a76ac)
- 로컬스토리지에 저장된 토큰으로 crud 처리
    - 데이터 가져오기기 : todo 페이지가 렌더링 될 때 데이를 가져옴
        - 로딩 시 : `Loading...` 메시지 출력
        - 에러 시 : `로그인을 완료해주세요!` 메시지 출력 (토큰이 없는 경우)
    - 추가 : input에 값이 없을 경우 에러메시지 출력 및 추가버튼 비활성화
    - 수정 : 수정 버튼 클릭된 요소를 input으로 변경 및 `제출`, `취소`버튼으로 변경
    - 삭제 : todo 삭제
    - 취소 : 취소 시 수정 input에 변경된 value를 저장하지 않고, input요소를 다시 span태그로 변경 및 `수정`, `삭제`버튼으로 되돌림