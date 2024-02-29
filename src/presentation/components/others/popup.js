import "./others.css"
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changePopupStatus } from "../../states/reducers/popupSlice";

export default function Popup(props) {
    const dispatch = useDispatch()
    const popupStatus = useSelector(state => state.popup)

    const closePopup = () => {
        dispatch(
            changePopupStatus({
                boardDetail: false,
                createBoard: false
            })
        )
    }

    return (
        <div className="popup-container">
            <AiFillCloseCircle
                color="var(--main)"
                size={24}
                style={{ position: 'absolute', right: 32, zIndex: "100" }}
                onClick={closePopup}
            />
            {
                props.content
            }
        </div>
    )
}