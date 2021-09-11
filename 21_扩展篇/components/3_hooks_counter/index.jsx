import React, {useState, useEffect} from 'react'

//这就是一个最简单的自定义use,可以定义一个hooks目录专门管理这种代码
const useCount = (initialCount = 0) => {
    const [count, setCount] = useState(initialCount)
    return [count, ()=>setCount(count + 1), ()=>setCount(count - 1)]
}

export default () => {
    const [count, increment, decrement] = useCount(1)

    useEffect(() => {
        console.log("component update")
        document.title=`标题-${count} times`
        return () => {
            console.log("unbind")
        }
    }, [count])

    return (
        <>
            <span>当前count：{count}</span>
            <input type="button" value="加1" onClick={increment}/>
            <input type="button" value="减1" onClick={decrement}/>
        </>
    )
}