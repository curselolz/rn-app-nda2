import { SET_PROFILE_IMAGE, START_EDIT_PROFILE, END_EDIT_PROFILE, SET_USER_IMAGE_URI, FILL_USER, CHANGE_AVATAR_ID, BANK_ACCOUNT_TOKEN_RECEIVED } from "../actions/constants/index.constants";

const initialState = {
    user: {
        photo: {
            uri: ''
        }
    },
    imagePicked: false,
    edit: false,
    avatarId: null,
    changedId: null,
    bankAccountId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_IMAGE:
            return { ...state, changedId: action.payload.id, user: { ...state.user, photo: action.payload.photo }, imagePicked: true };
        case FILL_USER:
            return { ...state, avatarId: action.payload.profile && action.payload.profile.avatar_id }
        case START_EDIT_PROFILE:
            return { ...state, imagePicked: false, edit: true }
        case END_EDIT_PROFILE:
            return { ...state, edit: false, imagePicked: false }
        case SET_USER_IMAGE_URI:
            return { ...state, user: { ...state.user, photo: { ...state.user.photo, uri: action.payload } } }
        case CHANGE_AVATAR_ID:
            return { ...state, avatarId: action.payload, changedId: null }
        case BANK_ACCOUNT_TOKEN_RECEIVED:
            return { ...state, bankAccountId: action.payload.tokenId }
        default:
            return state
    }
}
