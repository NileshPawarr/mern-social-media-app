import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user: {
        "_id": "60c8f5d99b378129dce02e32",
        "profilePicture": "person/1.jpeg",
        "coverPicture": "",
        "followers": [],
        "isAdmin": false,
        "username": "jane",
        "email": "jane@gmail.com",
        "city": "Paris",
        "from": "Berlin",
        "relationship": "2",
        "desc": "welcome to my page",
        "followings": ["60c8e79597409123bc320b41"]
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider
            value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};