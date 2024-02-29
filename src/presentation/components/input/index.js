import "./input.css"

export default function Input(props) {

    const handleInput = (e) => {
        const value = e.target.value;
        props.takeInput(value);
    }

    switch (props.type) {
        case 'search':
            return (
                <input
                    onChange={handleInput}
                    placeholder="검색하기..."
                    value={props.value}
                />
            )
        case 'textarea':
            return (
                <textarea
                    onChange={handleInput}
                    placeholder="입력하기..."
                    value={props.value}
                />
            )
        case "comment":
            return (
                <div className="pr">
                    <input
                        onChange={handleInput}
                        placeholder="입력하기..."
                        value={props.value}
                    />
                    <div className="send pa" onClick={props.submitComment}>Send</div>
                </div>
            )
    }
}