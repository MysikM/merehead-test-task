import './user.scss';
import {useState} from "react";
import {Link} from "react-router-dom";

const User = ({ user_id ,desc, name, surname}) => {
    const [isSeeMore, setIsSeeMore] = useState(false);
    const handleClick = () => setIsSeeMore(!isSeeMore);
    return (
        <li className='users-list--item'>
            <div className='users-list--name-container'>
                <p>Name: <span>{name || ''}</span></p>
                <p>Surname: <span>{surname || ''}</span></p>
                <Link className='users-list--edit' to={`/user-config/${user_id}`}>Edit</Link>
                <p className='users-list--delete' onClick={()=>{
                    console.log('test')}}>Delete</p>
            </div>
            {desc && (<p>Description: <span>{isSeeMore ? desc : `${desc.slice(0, 18)}` }</span> {desc?.length > 20 && <button className='users-list--btn' onClick={handleClick}>{isSeeMore ? 'Hide' : 'See More'}</button>}</p>)}
        </li>
    );
};

export default User;