import AuthContext from "context/AuthContext";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface PostListProps {
    hasNavigation ? : boolean;
    defaultTab ? : TabType;
}

type TabType='all'|'my';

export interface PostProps { //여러개의 항목을 내보낼 때 사용 , 사용할 때도 중괄호 안에서 여러개를 사용 가능.
    id?: string; //선택적 프로퍼티 있을수도 있고 없을수도 있다. 없어도 에러가 안남.
    title: string;
    email: string;
    summary: string;
    content: string;
    createdAt: string;
    updatedAt? : string;
    uid : string;
    category ? : CategoryType;
  }

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';
export const CATEGORIES : CategoryType[] = ["Frontend", "Backend", "Web", "Native"];

export default function PostList({hasNavigation=true,defaultTab='all'}:PostListProps){ //기본적으로 하나만 내보낼 수 있고 중괄호 없이 사용
    const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
    const [posts,setPosts] = useState<PostProps[]>([]);
    const {user} = useContext(AuthContext);

    const getPosts = async ()=>{
        setPosts([]);
        let postRef = collection(db,'posts');
        let postQuery;
        
        if(activeTab==='my' && user){
            //나의 글만 필터링해서 보여주기
            postQuery = query(postRef,
                where('uid','==',user.uid),
                orderBy('createdAt','asc'));
        }else{
            postQuery = query(postRef,orderBy('createdAt','asc'));
        }
        
        const datas = await getDocs(postQuery);
        datas?.forEach((doc)=>{
            console.log(doc.data(),doc.id);
            const dataObj = {...doc.data(),id:doc.id} //깊은 복사로 doc.data()에 있는 내용을 복사하고 id를 추가해서 새로운 객체를 만든다.
            setPosts((prev)=>[...prev,dataObj as PostProps]);  //... -> 전개 연산자 기존 객체나 배열의 변경 없이 새로운 객체나 배열을 만들 수 있다. 
        }) 
    }

    const handleDelete = async (id:string)=>{
        const confirm = window.confirm("삭제하시겠습니까?");
        if (confirm && id){
            await deleteDoc(doc(db,'posts',id));
        }
        toast.success('삭제되었습니다.');
        getPosts();
    };



    useEffect(()=>{ //렌더링 이후 마운팅될 때 실행된다. 
        getPosts(); //그렇기에 useEffect안에는 초기화 작업을 수행하는 함수가 들어오는 것이 좋다.
    },[activeTab]);  //빈 배열이 있다는 것은 렌더링 이후 한번만 실행된다는 것. 배열 안에 상태에 따라 값이 바뀌는 요소가 들어오면 그 값이 바뀔때마다 안에 있는 함수가 실행된다.


    return (
        <>
        {hasNavigation && (
            <div className='post__navigation'>
                <div 
                role='presentation'
                onClick={()=>setActiveTab("all")}
                className={activeTab ==='all' ? 'post__navigation--active':""}>전체
                </div>
                <div 
                role='presentation' 
                onClick={()=>setActiveTab("my")}
                className={activeTab ==='my' ? 'post__navigation--active':""}>나의글
                </div>
            </div>
        )}
        <div className='post__list'>
               { posts?.length > 0 ? posts?.map((post,index)=>(
            <div key={post?.id} className='post__box'>
                <Link to={`/posts/${post?.id}`}>
                <div className='post__profile-box'>
                    <div className='post__profile'/>
                    <div className='post__author-name'>{post?.email}</div>
                    <div className='post__date'>{post?.createdAt}</div>
                </div>
                <div className='post__title'>{post?.title}</div>
                <div className='post__text'>{post?.summary}</div>
                </Link>
                    {post?.email === user?.email && (
                        <div className='post__utils-box'>
                            <div className='post__delete' role="presentation" onClick={()=>handleDelete(post.id as string)}>삭제</div>
                            <div className='post__edit'>
                                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                            </div>
                        </div>
                    )}
            </div>
        ))
        :<div className="post__no-post">'게시글이 없습니다.'</div>}
    </div>
    </>

    );
}