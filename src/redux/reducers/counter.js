export default function counterReducer(state = initialState, action) {
    // console.log(state, 'counter')

    switch (action.type) {
        case 'increase': return Object.assign({}, state, {
            count: state.count + 1
        });
        case 'sayHello':  return Object.assign({}, state, {
            hello: state.hello + 'hello! '
        });
        default: return state;
    }
}

const initialState = {
    count: 0,
    hello: 'I say '
}
