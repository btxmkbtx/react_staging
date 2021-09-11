import React from 'react'
import {createStore} from 'redux'
import {Provider, useSelector, useDispatch} from 'react-redux'

const initState = {count: 0}

const reducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return {...state, count: state.count + 1}
        case "decrement":
            return {...state, count: state.count - 1}
        default:
            return state
    }
}

const store = createStore(reducer, initState)

const ComponentUseReactRedux = () => {
    return (
        <div style={{backgroundColor: 'lightblue', padding:10}}>
            <h2>父组件</h2>
            <Provider store={store}> 
                <ChildComponentUseReactRedux/>
            </Provider>
        </div>
    )
}

const ChildComponentUseReactRedux = () => {
    const count = useSelector(state => state.count)
    const dispatch = useDispatch()
    return (
        <div style={{backgroundColor: 'lightpink'}}>
            <h3>子组件</h3>
            <h3>通过 useSelector useDispatch 取得和操作共享状态</h3>
            <span>Count is :{count}</span>
            <button onClick={() => dispatch({type: "increment"})}>加一</button>
            <button onClick={() => dispatch({type: "decrement"})}>减一</button>
        </div>
    )
}

export default ComponentUseReactRedux
