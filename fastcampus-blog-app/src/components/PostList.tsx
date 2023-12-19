import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PostListProps {
    hasNavigation ? : boolean;
}

type TabType='all'|'my';

export default function PostList({hasNavigation=true}){
    const [activeTab, setActiveTab] = useState<TabType>("all");

    const getPosts = async ()=>{
        const datas = await getDocs(collection(db,'cities'));
        datas?.forEach((doc)=>{
            console.log(doc.data());
        })
    }

    useEffect(()=>{
        getPosts();
    },[]);

    
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
        {[...Array(10)].map((e,index)=>(
            <div key={index} className='post__box'>
                <Link to={`/posts/${index}`}>
                <div className='post__profile-box'>
                    <div className='post__profile'/>
                    <div className='post__author-name'>패스트캠퍼스</div>
                    <div className='post__date'>23.07.08</div>
                </div>
                <div className='post__title'>게시글 {index}</div>
                <div className='post__text'>
                중앙선거관리위원회는 대통령이 임명하는 3인, 국회에서 선출하는 3인과 대법원장이 지명하는 3인의 위원으로 구성한다. 위원장은 위원중에서 호선한다.

연소자의 근로는 특별한 보호를 받는다. 대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다. 감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다.
                중앙선거관리위원회는 대통령이 임명하는 3인, 국회에서 선출하는 3인과 대법원장이 지명하는 3인의 위원으로 구성한다. 위원장은 위원중에서 호선한다.

연소자의 근로는 특별한 보호를 받는다. 대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다. 감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다.
                </div>
                <div className='post__utils-box'>
                    <div className='post__delete'>삭제</div>
                    <div className='post__edit'>수정.</div>
                </div>

                </Link>
            </div>
        ))}

    </div>
    </>

    );
}