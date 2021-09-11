import React, { useReducer } from 'react'

//来体验一下hooks把Redux重写成了多么简单的东西了

function reducer(state, action) {
    switch (action.type) {
        case "add":
            return {count: state.count + 1}
        case "sub":
            return {count: state.count - 1}
        default:
            throw "..."
    }
}

const ReducerDemo1 = () => {
    const [counter, dispatch] = useReducer(reducer, {count: 0})

    return <div>
        Count is: {counter.count}
        <button onClick={() => dispatch({type: "add"})}>+</button>
        <button onClick={() => dispatch({type: "sub"})}>-</button>
    </div>
}
export default ReducerDemo1
