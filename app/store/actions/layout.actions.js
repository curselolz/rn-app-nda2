import { SHOW_BTN_SPINNER, HIDE_BTN_SPINNER, SHOW_LOADER, HIDE_LOADER } from './constants/index.constants'

export const showBtnSpinner = () => {
    return dispatch => {
        dispatch({ type: SHOW_BTN_SPINNER })
    }
}

export const hideBtnSpinner = () => {
    return dispatch => {
        dispatch({ type: HIDE_BTN_SPINNER })
    }
}

export const toggleLoader = (bool) => {
    return { type: bool ? SHOW_LOADER : HIDE_LOADER }
}