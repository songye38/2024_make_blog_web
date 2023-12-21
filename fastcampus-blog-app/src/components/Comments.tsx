import { useState } from "react"


const COMMENTS = [
    {
        id : 1,
        email : "vsongyev@hanmail.net",
        content : '댓글입니다 1',
        createdAt : '2023-12-22',
    },
    {
        id : 2,
        email : "vsongyev@hanmail.net",
        content : '댓글입니다 2',
        createdAt : '2023-12-22',
    },
    {
        id : 3,
        email : "vsongyev@hanmail.net",
        content : '댓글입니다 3',
        createdAt : '2023-12-22',
    },
    {
        id : 4,
        email : "vsongyev@hanmail.net",
        content : '댓글입니다 4',
        createdAt : '2023-12-22',
    },
    {
        id : 5,
        email : "vsongyev@hanmail.net",
        content : '댓글입니다 5',
        createdAt : '2023-12-22',
    },
]






export default function Comments(){
    const [comment,setComment] = useState("")
    const onChange =(e : React.ChangeEvent<HTMLTextAreaElement>)=>{
        const {
            target : {name,value},
        } = e;

    if (name==='comment'){
        setComment(value);
    }
    }
    return (
        <div className="comments">
        <form className="comments__form">
            <div className="form__block">
                <label htmlFor="comment">댓글입력</label>
                <textarea name='comment' id='comment' required value={comment} onChange={onChange}/>
            </div>
            <div className="form__block">
                <input type='submit' value='입력' className="form__btn-submit"/>
            </div>
        </form>
        <div className="comments__list">
            {COMMENTS?.map((comment)=>(
                <div key={comment.id} className="comment__box">
                    <div className="comment__profile-box">
                        <div className="comment__email">{comment?.email}</div>
                        <div className="comment__date">{comment?.createdAt}</div>
                        <div className="comment__delete">삭제</div>
                    </div>
                    <div className="comment__text">{comment?.content}</div>
                </div>
            ))}
        </div>
    </div>
    )
    
}