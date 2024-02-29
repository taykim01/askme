import "./comment.css"

export default function Comment(props) {

    return (
        <div className="comment">
            {/* part 1: profile & date */}
            <div className="hf sbj ca w100">
                <div className="h3">익명이의 댓글 {props.id}</div>
                <div className="p2">{props.date}</div>
            </div>

            {/* part 2: content */}
            <div className="p2">
                {props.comment}
            </div>
        </div>
    )
}