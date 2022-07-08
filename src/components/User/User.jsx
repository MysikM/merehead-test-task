import './user.scss';
import {useState} from "react";

const User = ({desc, name, surname}) => {
    const [isSeeMore, setIsSeeMore] = useState(false);
    const handleClick = () => setIsSeeMore(!isSeeMore);
    return (
        <li className='users-list--item'>
            <div className='users-list--name-container'>
                <p>Name: <span>{name}</span></p>
                <p>Surname: <span>{surname}</span></p>
            </div>
            <p>Description: <span>{isSeeMore ? desc : `${desc.slice(0, 18)}` }</span> {desc.length > 20 && <button className='users-list--btn' onClick={handleClick}>{isSeeMore ? 'Hide' : 'See More'}</button>}</p>
        </li>
    );
};

export default User;