const log = ({ dispatch, getState }) => next => action => {
    console.log('ACTION: ' + action.type, action)

    return next(action)
}

export default log