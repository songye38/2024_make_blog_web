import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import {app} from 'firebaseApp';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

export default function LoginForm(){

    // 상태값을 저장할 수 있는 에러 , 이메일, 비밀번호값 만들기
    const [error,setError] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")

    const onSubmit  = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const auth = getAuth(app); 
            await signInWithEmailAndPassword(auth,email,password);
            toast.success("로그인에 성공했습니다.");
        }catch(error:any){
            toast.error(error?.code)
        }
    }

    // 이메일과 비밀번호값을 onChange함수로 받고 이 값의 유효성 체크하기
    const onChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const {
            target : {name, value},

        } = e;

        if (name=='email'){
            setEmail(value);

            const validRegex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

            if(!value?.match(validRegex)){
                setError('이메일 형식이 올바르지 않습니다.')
            }else{
                setError('')
            }
        }
        if (name=='password'){
            setPassword(value);

            if (value?.length <0){
                setError("비밀번호는 8자리 이상 입력해주세요");
            }else{
                setError("");
            }
        }
    }

    return (
        <form onSubmit={onSubmit} method='POST' className="form form-lg">
            <h1 className="form__title">로그인</h1>
            <div className="form__block">
            <label htmlFor="email">이메일</label>
                <input type='email' name='email' id='title' onChange={onChange} required value={email}/>
            </div>
            <div className="form__block">
                <label htmlFor="password">비밀번호</label>
                <input type='password' name='password' id='title' onChange={onChange} required value={password} />
            </div>

            {/* 에러 메세지 띄우기 */}
            {error && error?.length>0 && (
                <div className="form__block">
                    <div className="form__error">{error}</div>
                </div>
            )}
            <div className="form__block">
                계정이 없으신가요?
                <Link to='/signup' className="form__link">회원가입하기</Link>
            </div>
            <div className="form__block">
                <input type='submit' value='로그인' className="form__btn--submit" disabled = {error?.length>0} />
            </div>
        </form>
    );
}