import {createSession, getIsAdm} from "./services/api"

export const loginUser = () => {
    return {
        type: 'login'
    }
}
export const loginUserAdm = (isAdm) => {
    return {
        type: 'modificaAutorizacao',
        isAdm
    }
}

export async function reduxLogin({email, password}){
    return async dispatch => {
        const response = await createSession(email, password)
        const token = response.data.token;
         console.log(token);
        localStorage.setItem("token", response.data.token);
        dispatch(loginUser())
        
    }
}
export async function modificaAdm(){
    return async dispatch => {
        const response = await getIsAdm()
        dispatch(loginUser(response.data.isAdm))
        
    }
}