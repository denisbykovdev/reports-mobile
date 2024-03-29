export const authInitial = {
    token: null,
    isAdmin: false,
    loading: false,
    error: null
};

export const authReducer = (
    state = authInitial,
    action
) => {
    switch (action.type) {
        case "LOAD_TOKEN":
            return {
                ...state,
                loading: true
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
                isAdmin: action.isAdmin,
                loading: false,
            };
        case "DEL_TOKEN":
            return {
                ...state,
                token: null,
                isAdmin: false,
                error: null,
                loading: false
            };
        case "ERROR_TOKEN":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
    };
};