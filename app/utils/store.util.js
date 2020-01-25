import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import Reducer from '../store/reducers/index.reducer'
import { DEBUGGER_ENABLE } from './config.util';
const loggerVar = logger;

export default store = DEBUGGER_ENABLE
? createStore(Reducer,
    applyMiddleware(
        thunk,
        // torn OFF when release
        loggerVar
        ))
        :createStore(Reducer,
            applyMiddleware(
                thunk,
                ))
