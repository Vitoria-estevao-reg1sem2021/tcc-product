const initialState = {
    loggedIn: false,
    isAdm: false
}

export default function appReducer(state = initialState, action){
    const currentProducts = state.checkoutProducts;
    switch(action.type){

        case 'login':
            return {
                ...state,
                loggedIn : true
            }

        case 'modificaAutorizacao':
            return {
                ...state,
                isAdm: action.isAdm
            }

        default:
            return state;
    }
}