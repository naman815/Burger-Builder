import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () =>{
    return{
        type : actionTypes.AUTH_START
    }
};


export const authSuccess = (token,userId) =>{
    return{
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    }
};

export const authFail = (error) =>{
    return{
        type : actionTypes.AUTH_FAIL,
        error : error
    }
};

export const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    return{
        type : actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000)
    }
}

export const auth = (email,password,isSignup)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        };
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfttIFh_OG-j45RkDdUMJiy1cRb-3p74U';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfttIFh_OG-j45RkDdUMJiy1cRb-3p74U'
        }
        axios.post(url,authData)
        .then(res =>{
            const expDate = new Date(new Date().getTime() + res.data.expiresIn*1000)
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expirationDate',expDate)
            localStorage.setItem('userId',res.data.localId)
            dispatch(authSuccess(res.data.idToken,res.data.localId));

            dispatch(checkAuthTimeout(res.data.expiresIn))
        }
        )
        .catch(err =>{
            
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const setAuth = (path) =>{
    return{
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authCheck = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expiration = new Date(localStorage.getItem('expirationDate'));
            if(expiration <= new Date()){
                dispatch(logout());
            }
            else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expiration.getTime() - new Date().getTime())/1000));
            }
        }
    }
}