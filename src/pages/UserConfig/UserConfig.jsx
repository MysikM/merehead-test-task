import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './user-config.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUserById, postCreateNewUser, postEditUserById, resetUser} from "../../store/usersSlice/usersSlice";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import Preloader from "../../components/Preloader/Preloader";

const UserConfig = () => {
    const {id} = useParams();
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userDescription, setUserDescription] = useState('');

    const { success, user, loading } = useSelector(state => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id) {
            dispatch(getUserById(id));
        }
        return () =>{
            dispatch(resetUser());
        }
    }, [id])

    useEffect(()=>{
        if(user) {
            setUserName(user?.name || '');
            setUserDescription(user?.desc || '');
            setUserSurname(user?.surname || '');
        }
    },[user])

    useEffect(()=>{
        if(success) {
            navigate('/users');
        }
    }, [success]);

    const createNewUser = (e) => {
        e.preventDefault();
        if(userName.trim() && userSurname.trim() && userDescription.trim()) {
            setUserName('');
            setUserSurname('');
            setUserDescription('');
            const newUser = {
                desc: userDescription,
                name: userName,
                surname: userSurname,
            }
            dispatch(postCreateNewUser(newUser));
        }
    };

    const editUser = (e) => {
        e.preventDefault();
        if(userName.trim() && userSurname.trim() && userDescription.trim()) {
            const editUser = {
                desc: userDescription,
                name: userName,
                surname: userSurname,
                user_id: id,
            }
            dispatch(postEditUserById(editUser));
        }
    }

    if(loading) {
        return <Preloader />
    }

    return (
        <form className='user-config' onSubmit={(e) => {id ? editUser(e) : createNewUser(e)}}>
            <h1 className=''>{id ? 'Edit User' : 'Create New User'}</h1>

            <CustomInput title='name' inputName={userName} setFunc={setUserName} />
            <CustomInput title='surname' inputName={userSurname} setFunc={setUserSurname} />
            <CustomTextarea title='description' nameTextarea={userDescription} setFunc={setUserDescription} />

            <input type='submit' className='user-config__btn btn' value={`${id ? 'Edit user' : 'Create user'}`}/>
            {loading && (<Preloader />)}
        </form>
    );
};

export default UserConfig;