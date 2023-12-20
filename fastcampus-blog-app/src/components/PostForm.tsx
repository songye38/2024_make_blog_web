import { useContext, useEffect, useState } from "react"
import { db } from "firebaseApp";
import {collection,addDoc, doc, getDoc} from 'firebase/firestore';
import AuthContext from "context/AuthContext";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "./PostList";

export default function PostForm(){
    const params = useParams();
    const [post,setPost] = useState<PostProps|null>(null);
    const [title,setTitle] = useState<string>('');
    const [summary,setSummary] = useState<string>('');
    const [content,setContent] = useState<string>('');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(post);

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            await addDoc(collection(db,'posts'),{
                title : title,
                summary : summary,
                content : content,
                createdAt : new Date()?.toLocaleDateString(),
                email : user?.email,

            });
            toast?.success("게시글을 생성했습니다.")
            navigate('/');

        }catch(error:any){
            toast.error(error?.code);

        }
    }


    const onChange  = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {target : {name, value}
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
    const getPost = async (id : string)=>{
        if(id){
            const docRef = doc(db,'posts',id);
            const docSnap = await getDoc(docRef);
            
            setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
            // setPost([{ id: docSnap.id, ...(docSnap.data()) as PostProps }]);

        } 
    };

    console.log(post);

    useEffect(()=>{
        if(params?.id) getPost(params?.id);
    },[params?.id]);


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