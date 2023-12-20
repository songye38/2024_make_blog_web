import {ReactNode, createContext,useEffect,useState} from 'react';
import {User,getAuth, onAuthStateChanged} from 'firebase/auth';
import { app } from 'firebaseApp';


interface AuthProps {
    children : ReactNode; //이 컴포넌트는 다양한 형태의 자식을 받아들일 수 있다. string으로 되어 있으면 string형태의 자식만 가질 수 있음.
}


//User | null : TypeScript에서 유니온 타입(Union Type)
//user 속성은 User 타입의 객체이거나 null일 수 있다.
const AuthContext = createContext({ //AuthContext는 Consumer, Provider를 포함하고 있음. 
    user : null as User | null, //사용자 정보가 있으면 User가 되고 없으면 null이 된다.
});

//선언과 동시에 내보내는 방식
export const AuthContextProvider = ({children}:AuthProps) =>{
    const auth = getAuth(app);
    const [currentUser,setCurrentUser] = useState<User | null>(null); //유니온 타입

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrentUser(user);
            }else{
                setCurrentUser(user);
            }
        });
    },[auth]); //auth의 상태가 바뀔때마다 onAuthStateChanged 실행된다.

    return (
        <AuthContext.Provider value = {{user : currentUser}}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthContext;