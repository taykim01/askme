import BoardUseCase from "../../../domain/usecases/BoardUseCase"
import Button from "../button"
import "./board.css"
import dateFormat from "../../utils/dateFormat"
import { useState, useEffect } from "react"

export default function Board(props) {
    const boardFunctions = new BoardUseCase()
    const [likeCount, setLikeCount] = useState(props.board.likeCount);

    useEffect(() => {
        setLikeCount(props.board.likeCount);
    }, [props.board.likeCount]);

    const handleLike = async () => {
        await boardFunctions.submitLike(props.board.id);
        setLikeCount(likeCount + 1);
    }

    const today = new Date()
    const thisDay = `${today.getMonth() + 1}월 ${today.getDate()}일`
    const yesterday = `${today.getMonth() + 1}월 ${today.getDate() - 1}일`
    const date = dateFormat(props.board.createdAt) === thisDay
        ? "오늘"
        : dateFormat(props.board.createdAt) === yesterday
            ? "어제"
            : dateFormat(props.board.createdAt)

    return (
        <div className="board">

            {/* part 1: profile & date */}
            <div className="hf sbj ca w100" onClick={props.onClick}>
                <div className="hf gap12 ca">
                    <div className="circle" />
                    <div className="h2">익명이의 {props.board.creator}번째 질문</div>
                </div>
                <div className="p2">{date}</div>
            </div>

            {/* part 2: content */}
            <div className="p1" onClick={props.onClick}>
                {props.board.content}
            </div>

            {/* part3: buttons */}
            <div className="hf gap12">
                <Button count={likeCount} text="공감" type="indicator" onClick={handleLike} />
                <Button count={props.board.comments.length} text="댓글" type="indicator" onClick={props.onClick} />
            </div>

        </div>
    )
}