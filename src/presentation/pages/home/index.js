import Board from "../../components/board";
import Input from "../../components/input";
import CreateBoard from "../../components/others/createBoard"
import Popup from "../../components/others/popup";
import { useState, useEffect } from "react";
import BoardUseCase from "../../../domain/usecases/BoardUseCase";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { changePopupStatus } from "../../states/reducers/popupSlice";
import BoardDetail from "../../components/board/boardDetail";

export default function Home() {
    const [boards, setBoards] = useState()
    const dispatch = useDispatch()
    const popupStatus = useSelector(state => state.popup)
    const board = new BoardUseCase();

    const initBoardList = async () => {
        const list = await board.readBoardPreview();
        setBoards(list)
    }

    useEffect(() => {
        initBoardList()
    }, [popupStatus])

    const createBoardPopup = () => {
        dispatch(
            changePopupStatus({
                ...popupStatus,
                createBoard: true
            })
        )
    }

    const [boardFilter, setBoardFilter] = useState()
    const queryBoards = (e) => {
        const queryResult = board.searchBoard(e, boards)
        setBoardFilter(queryResult)
    }

    const [detailInfo, setDetailInfo] = useState()
    const openBoardDetail = async (board) => {
        const boardInfo = board
        setDetailInfo(boardInfo)
        dispatch(
            changePopupStatus({
                ...popupStatus,
                boardDetail: true
            })
        )
    }

    return (
        <div>
            <div className="vf gap48 yp48">
                <div className="vf gap12">
                    <div className="h1 tcl">익명이 게시판 👻</div>
                    <Input type="search" takeInput={queryBoards} />
                </div>
                <div className="vf gap24 pb60">
                    {
                        boards
                            ? boardFilter
                                ? boardFilter.map(
                                    board =>
                                        <Board
                                            key={board.id}
                                            board={board}
                                            onClick={() => openBoardDetail(board)}
                                        />
                                )
                                : boards.map(
                                    board =>
                                        <Board
                                            key={board.id}
                                            board={board}
                                            onClick={() => openBoardDetail(board)}
                                        />
                                )
                            : []
                    }
                </div>
                <div className="fixed-to-bottom" style={{ width: 358, marginLeft: -4 }}>
                    <Button type="main" onClick={createBoardPopup} />
                </div>
            </div>
            {
                popupStatus.createBoard && <Popup content={<CreateBoard />} />
            }
            {
                (popupStatus.boardDetail && detailInfo) && <Popup content={<BoardDetail content={detailInfo} />} />
            }
            {
                (popupStatus.boardDetail || popupStatus.createBoard) && <div className="background-screen" />
            }
        </div>
    )
    }