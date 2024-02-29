import Comment from "../comment";
import { useState, useEffect, useRef } from "react";
import dateFormat from "../../utils/dateFormat";
import BoardUseCase from "../../../domain/usecases/BoardUseCase";
import Button from "../button";
import Input from "../input";

export default function BoardDetail(props) {
    const boardFunctions = new BoardUseCase()
    const [likeCount, setLikeCount] = useState(props.content.likeCount);
    const commentsEndRef = useRef(null);

    useEffect(() => {
        setLikeCount(props.content.likeCount);
    }, [props.content.likeCount]);

    const handleLike = async () => {
        await boardFunctions.submitLike(props.content.id);
        setLikeCount(likeCount + 1);
    }

    const [inputValue, setInputValue] = useState()
    const handleInput = (e) => {
        setInputValue(e)
    }

    const [dummyComment, setDummyComment] = useState([])
    const submitComment = async () => {
        if (inputValue) {
            await boardFunctions.submitComment(props.content.id, inputValue, props.content.comments.length)
            setDummyComment([...dummyComment, { createdAt: "오늘", comment: inputValue, id: props.content.comments.length + 1 }]);
            setInputValue("")
            commentsEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }

    return (
        <div className="popup pr">
            <div className="board-detail">
                <div className="hf sbj ca gap12">
                    <div className="circle" />
                    <div className="vf gap4">
                        <div className="h2">익명이의 {props.content.creator}번째 질문</div>
                        <div className="p2">{dateFormat(props.content.createdAt)}</div>
                    </div>
                </div>

                <div className="p1">
                    {props.content.content}
                </div>
                <Button count={likeCount} text="공감" type="indicator" onClick={handleLike} />
            </div>
            <div className="comments pb60">
                {
                    props.content.comments.map(
                        comment => {
                            return <Comment
                                date={dateFormat(comment.createdAt)}
                                comment={comment.comment}
                                id={comment.id || "x"}
                            />;
                        }
                    )
                }
                {
                    dummyComment && dummyComment.map(
                        comment => {
                            return <Comment
                                date={comment.createdAt}
                                comment={comment.comment}
                                id={comment.id}
                            />
                        }
                    )
                }
                <div className="idk"  style={{ marginTop: "80px"}} />
                <div ref={commentsEndRef} />
            </div>
            <div className="fixed-to-bottom" style={{ width: '326px' }}>
                <Input type="comment" takeInput={handleInput} value={inputValue} submitComment={submitComment} />
            </div>
        </div>
    )
}