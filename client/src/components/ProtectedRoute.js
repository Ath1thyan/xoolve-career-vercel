import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertSlice';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                dispatch(showLoading());
                const response = await axios.post('/api/user/get-user-info-by-id', {
                    token: localStorage.getItem('token')
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                dispatch(hideLoading());
                if (response.data.success) {
                    dispatch(setUser(response.data.data));
                } else {
                    localStorage.clear();
                    navigate('/login');
                }
            } catch (error) {
                dispatch(hideLoading());
                localStorage.clear();
                navigate('/login');
            }
        };

        if (!user && localStorage.getItem('token')) {
            getUser();
        }
    }, [user, navigate, dispatch]);

    if (user || localStorage.getItem('token')) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
