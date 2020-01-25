import { SCHEDULED_SELECTED, COMPLETED_SELECTED, FILL_COMPLETED_GIGS, FILL_SCHEDULED_GIGS } from "../actions/constants/index.constants";

const initialState = {
    scheduledGigs: null,
    completedGigs: null,
    selected: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SCHEDULED_SELECTED:
            return { ...state, selected: true }
        case COMPLETED_SELECTED:
            return { ...state, selected: false }
        case FILL_SCHEDULED_GIGS:
            return { ...state, scheduledGigs: action.payload }
        case FILL_COMPLETED_GIGS:
            return { ...state, completedGigs: action.payload }
        default:
            return state
    }
}