import React, {useState, useEffect} from 'react'
import useCount from './hooks/useCounter'

export default () => {
    const [count, increment, decrement] = useCount(1)

    return (
        <>
            <span>当前count：{count}</span>
            <input type="button" value="加1" onClick={increment}/>
            <input type="button" value="减1" onClick={decrement}/>
        </>
    )
}