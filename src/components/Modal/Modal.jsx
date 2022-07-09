import './modal.scss';
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeUserById, successOff} from "../../store/usersSlice/usersSlice";

const Modal = ({isModalActive, setIsModalActive, id}) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const {success} = useSelector(state => state.users);

    useEffect(()=>{
        if (success) {
            setIsModalActive(false);
            dispatch(successOff());
        }
    }, [success])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isModalActive && ref.current && !ref.current?.contains(e.target)) {
                setIsModalActive(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isModalActive]);

    const closeModal = () => {
        setIsModalActive(false);
    };

    const deleteUser = () => {
        dispatch(removeUserById(id));
    };


    return (
        <div className={`modal ${isModalActive && 'modal__active'}`}>
            <div className="modal--wrapper" ref={ref}>
                <h3 className='modal--title'>Do you want to delete this user?</h3>
                <div className='modal--btn-container'>
                    <button className='btn modal--btn' onClick={()=>{deleteUser()}}>Yes</button>
                    <button className='btn modal--btn modal--btn-danger' onClick={()=>{closeModal()}}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;