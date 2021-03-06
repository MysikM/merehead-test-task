import './userslist.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchUsers, resetDeleteUserId, resetUsers} from "../../store/usersSlice/usersSlice";
import User from "../User/User";
import Preloader from "../Preloader/Preloader";

const UsersList = () => {
    const dispatch = useDispatch();
    const {users, loading, deleteUserId} = useSelector(state => state.users);
    const [userDisplay, setUserDisplay] = useState([]);
    const [page, setPage] = useState(0);
    const limit = 5;
    const [totalUserCount, setTotalUserCount] = useState(null);
    const isViewMore = totalUserCount > userDisplay.length;

    const loadMoreUser = () => {
        if(isViewMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(()=>{
        dispatch(fetchUsers());
        setPage(0);
        return () =>{
            dispatch(resetUsers());
        }
    }, []);
    useEffect(()=>{
        if(users.length > 0 && page === 0) {
            setTotalUserCount(users.length);
            setPage(()=>1);
        } else if( users.length > 0) {
            setTotalUserCount(users.length);
        }
    }, [users]);
    useEffect(()=>{
       if(deleteUserId) {
           setUserDisplay(
               userDisplay.filter((el) => parseInt(el.user_id) !== parseInt(deleteUserId))
           );
           dispatch(resetDeleteUserId());
       }
    }, [deleteUserId]);
    useEffect(()=>{
        setUserDisplay(users.slice(0, page*limit));
    },[page]);

    return (
        <ul className='users-list'>
            {userDisplay.map((user) => (<User key={user._id} {...user} />))}
            {loading && <Preloader />}
            {isViewMore && (<button className='users-list--btn btn' onClick={loadMoreUser}>Load more</button>)}
        </ul>
    );
};

export default UsersList;