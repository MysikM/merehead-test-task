import './user.scss';
import {useState} from "react";
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";

const User = ({ user_id ,desc, name, surname}) => {
    const [isSeeMore, setIsSeeMore] = useState(false);
    const handleClick = () => setIsSeeMore(!isSeeMore);
    const [isModalActive, setIsModalActive] = useState(false);
    return (
        <li className='users-list--item'>
            <div className='users-list--name-container'>
                <p>Name: <span>{name || ''}</span></p>
                <p>Surname: <span>{surname || ''}</span></p>
                <Link className='users-list--edit' to={`/user-config/${user_id}`}>Edit</Link>
                <p className='users-list--delete' onClick={()=>{
                    setIsModalActive(true)}}>Delete</p>
            </div>
            <Modal isModalActive={isModalActive} setIsModalActive={setIsModalActive}/>
            {desc && (<p>Description: <span>{isSeeMore ? desc : `${desc.slice(0, 18)}` }</span> {desc?.length > 20 && <button className='users-list--btn' onClick={handleClick}>{isSeeMore ? 'Hide' : 'See More'}</button>}</p>)}
        </li>
    );
};

export default User;