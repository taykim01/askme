import { applyInput } from "../../states/reducers/inputSlice"
import Button from "../button"
import Input from "../input"
import BoardUseCase from "../../../domain/usecases/BoardUseCase.js"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changePopupStatus } from "../../states/reducers/popupSlice";

export default function CreateBoard(props) {
    const dispatch = useDispatch()
    const inputContent = useSelector(state => state.input.content)
    const [boards, setBoards] = useState()
    const [inputValue, setInputValue] = useState("");
    const popupStatus = useSelector(state => state.popup)

    const initBoardList = async () => {
        const board = new BoardUseCase();
        const list = await board.readBoardPreview();  
        setBoards(list)
    }

    useEffect(() => {
        initBoardList()
    }, [])

    const uploadInput = (e) => {
        const value = e
        setInputValue(value);
        dispatch(
            applyInput(value)
        )
    }

    const uploadBoard = async () => {
        setInputValue("");
        const newBoard = new BoardUseCase()
        await newBoard.submitBoard(inputContent, boards.length + 1)
        dispatch(
            changePopupStatus({
                ...popupStatus,
                createBoard: false
            })
        )
    }

    return (
        <div className="popup pr">
            <div className="section-head pb60">
                {/* part 1: profile & date */}
                <div className="hf sbj ca w100">
                    <div className="hf gap12 ca">
                        <div className="circle" />
                        <div className="h2">{boards ? boards.length + 1 : null}번째 익명이</div>
                    </div>
                    <div className="p2">{props.date}</div>
                </div>

                {/* part 2: content */}
                <Input type="textarea" takeInput={uploadInput} value={inputValue} />
            </div>
            <div className="fixed-to-bottom" style={{ width: 326 }}><Button type="main" onClick={uploadBoard} /></div>
        </div>
    )
}