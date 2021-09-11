import React, { useState, useEffect } from 'react'

function useInterval(callback, time){

    useEffect(() => {
        const I = setInterval(callback, time)
        return () => {// 在组件卸载前执行
            clearInterval(I)
        }
    }, [])

}

const EffectDemo2 = () => {

    const [count, setCount] = useState(0) 

    useInterval(() => {
        //注意这里不能写成setCount(count + 1),因为要写成函数形式，每一次执行时react才会帮我们拿到最新的count
        setCount(count => count + 1)
    }, 1000)

    return <div>
        <p>you clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>clike me</button>
    </div>
}
export default EffectDemo2
