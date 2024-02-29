import "./button.css"

export default function Button(props) {
    switch (props.type) {
        case "main":
            return (
                <button
                    className="main-button h3 light"
                    onClick={props.onClick}
                >
                    질문하기
                </button>
            )

        case "indicator":
            return (
                <button
                    className="basic"
                    onClick={props.onClick}
                >
                    <div className="b1 main">
                        {props.count}
                    </div>
                    <div className="b1 main">
                        {props.text}
                    </div>
                </button>
            )
    }
}