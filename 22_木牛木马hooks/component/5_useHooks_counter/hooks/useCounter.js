import React, {useState, useEffect} from 'react'

//这就是一个最简单的自定义use,可以定义一个hooks目录专门管理这种代码
export default function useCount(initialCount = 0){
    const [count, setCount] = useState(initialCount)

    useEffect(() => {
        console.log("component update")
        document.title=`标题-${count} times`
        return () => {
            console.log("unbind")
        }
    }, [count])

    return [count, ()=>setCount(count + 1), ()=>setCount(count - 1)]
}
