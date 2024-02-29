import { doc, collection, setDoc, getDocs, getDoc, updateDoc, orderBy, query, arrayUnion } from "firebase/firestore"
import { db } from "../firebase/index"
import BoardModel from "../models/BoardModel";

export default class BoardUseCase {

    async readBoardPreview() { // reads all boards, with the following information: name, profile, createdAt, content, likes
        let boardList = []
        try {
            const boardsRef = collection(db, "boards")
            const queryResult = query(boardsRef, orderBy("createdAt", "desc"))
            const querySnapshot = await getDocs(queryResult)
            querySnapshot.forEach(
                (doc) => {
                    boardList.push(
                        {
                            ...doc.data(),
                            id: doc.id
                        }
                    )
                }
            )
        } catch (error) {
            console.error(error)
        }
        return boardList;
    }

    async submitLike(boardId) { // submits a like to (boardId)
        try {
            const boards = [];
            const docRef = doc(db, "boards", boardId)
            const docSnap = await getDoc(docRef);
            boards.unshift({
                ...docSnap.data(),
                id: docSnap.id,
            })

            const ref = doc(db, "boards", boardId);
            await updateDoc(ref, {
                likeCount: boards[0].likeCount + 1
            });
        } catch (error) {
            console.error(error)
        }
    }

    async submitComment(boardId, comment, commentLength) { // submits a comment to (boardId)
        try {
            const boardRef = doc(db, "boards", boardId);
            const date = new Date()

            await updateDoc(boardRef, {
                comments: arrayUnion({
                    comment: comment,
                    createdAt: date,
                    id: commentLength + 1
                })
            });
        } catch (error) {
            console.error(error)
        }
    }

    searchBoard(boardInfo, boardList) { // searches a board, checks if (boardContent) is included in board.content
        const filteredBoards = boardList.filter(
            board => {
                return board.content.includes(boardInfo);
            }
        );
        return filteredBoards;
    }

    async submitBoard(boardContent, creatorId) {

        const date = new Date()
        if (boardContent) {
            try {
                const newBoard = new BoardModel(
                    date,
                    creatorId,
                    null,
                    boardContent,
                    0,
                    []
                )

                console.log(newBoard)
                const docRef = doc(collection(db, "boards"))
                await setDoc(
                    docRef, newBoard.toObject()
                );
            } catch (error) {
                console.error(error)
            }
        } else {
            alert("내용을 써주세요!")
        }
    }

    deleteBoard(boardId) { // deletes board if I created it

    }
}