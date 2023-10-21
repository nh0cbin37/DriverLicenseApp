
import { FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAILURE, SET_INDEX, SET_OPTION_STYLES } from './Middleware';

const initialState = {
    loading: false,
    question: [],
    error: '',
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_QUESTIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                question: action.payload,
                error: ''
            }
        case FETCH_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                question: [],
                error: action.payload
            }
        default:
            return state;
    }
}

export default Reducer;
