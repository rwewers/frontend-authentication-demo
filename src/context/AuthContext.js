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

    return(

        <AuthContext.Provider value={authState}>
            {authState.status === 'done' && children}
            {authState.status === 'pending' && <p>Loading...</p>}
        </AuthContext.Provider>
    );
}
function useAuthState(){

    const authState = useContext(AuthContext);

    const isDone = authState.status === 'done';
    const isAuthenticated =   authState.user !== null && isDone;

    console.log('Ik ben authenticated', isAuthenticated);

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