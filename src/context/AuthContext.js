import {useContext, createContext, useEffect, useState} from 'react';

const AuthContext = createContext({});

function AuthContextProvidor({ children }){
    const [authState, setAuthState] = useState({
        status: 'pending',
        error: null,
        user: null,
    })

    useEffect(()=> {

        setTimeout(()=>{

            setAuthState( {
                ...authState,
               status: 'done',
            })
        }, 2000)
    }, []);

    function logout(){

    }

    function login(data){
       // console.log(data);
        localStorage.setItem('data', data.accessToken);

        setAuthState( {
            ...authState,
            user: {
                username: data.username,
                email: data.email,
                roles: data.roles,
            }
        })


    }

    const providorData = {
        ...authState,
        login,
        logout,

    }
    return(

        <AuthContext.Provider value={providorData}>
            {authState.status === 'done' && children}
            {authState.status === 'pending' && <p>Loading...</p>}
        </AuthContext.Provider>
    );
}
function useAuthState(){

    const authState = useContext(AuthContext);

    const isDone = authState.status === 'done';
    const isAuthenticated =   authState.user !== null && isDone;


    return{
        ...authState,
        isAuthenticated: isAuthenticated,
    }

}

export{

    AuthContext,
    AuthContextProvidor,
    useAuthState,

}