import { useState } from "react"
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
        <div className="comments__list"></div>
    </div>
    )
    
}