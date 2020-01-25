import { FILL_TRANSACTIONS } from "../actions/constants/index.constants";

const initialState = {
    transactions: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FILL_TRANSACTIONS:
            return { ...state, transactions: action.payload };
        default:
            return state
    }
}