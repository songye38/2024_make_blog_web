import { Link } from "react-router-dom"

export default function PostDetail(){


    return <>
    <div className="post__detail">
        <div className="post__box">
            <div className="post__title">안녕하세요 만나서 반갑습니다.</div>
        </div>
        <div className='post__profile-box'>
            <div className='post__profile'/>
            <div className='post__author-name'>패스트캠퍼스</div>
            <div className='post__date'>23.07.08</div>
        </div>
        <div className='post__utils-box'>
            <div className='post__delete'>삭제</div>
            <div className='post__edit'>
                <Link to={`/posts/edit/1`}>수정</Link>
            </div>
        </div>
        <div className='post__text'>
        중앙선거관리위원회는 대통령이 임명하는 3인, 국회에서 선출하는 3인과 대법원장이 지명하는 3인의 위원으로 구성한다. 위원장은 위원중에서 호선한다.

연소자의 근로는 특별한 보호를 받는다. 대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다. 감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다.
        중앙선거관리위원회는 대통령이 임명하는 3인, 국회에서 선출하는 3인과 대법원장이 지명하는 3인의 위원으로 구성한다. 위원장은 위원중에서 호선한다.

연소자의 근로는 특별한 보호를 받는다. 대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다. 감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다.
        </div>
    </div>
    </>


}