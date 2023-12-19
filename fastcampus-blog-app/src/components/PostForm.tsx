import { useContext, useState } from "react"
import { db } from "firebaseApp";
import {collection,addDoc} from 'firebase/firestore';
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostForm(){

    const [title,setTitle] = useState<string>('');
    const [summary,setSummary] = useState<string>('');
    const [content,setContent] = useState<string>('');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            await addDoc(collection(db,'posts'),{
                title : title,
                summary : summary,
                content : content,
                createAt : new Date()?.toLocaleDateString(),
                email : user?.email,

            });
            toast?.success("게시글을 생성했습니다.")
            navigate('/');

        }catch(error:any){
            toast.error(error?.code);

        }
    }


    const onChange  = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {target : {name, value},
    } = e;

    if (name==='title'){
        setTitle(value);

    }
    if (name==='summary'){
        setSummary(value);

    }
    if(name==='content'){
        setContent(value);
    }
    }


    return <form onSubmit={onSubmit} className="form">
        <div className="form__block">
            <label htmlFor="title">제목</label>
            <input type='text' name='title' id='title' required value={title} onChange={onChange}/>
        </div>
        <div className="form__block">
            <label htmlFor="summary">요약</label>
            <input type='text' name='summary' id='summary' required value={summary} onChange={onChange}/>
        </div>
        <div className="form__block">
            <label htmlFor="content">내용</label>
            <textarea name='content' id='content' required value={content} onChange={onChange}/>
        </div>
        <div className="form__block">
            <input type='submit' value='제출' className="form__btn--submit" />
        </div>
    </form>
}