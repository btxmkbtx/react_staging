import React, { useState } from 'react'

//一个最简单的状态hook
const StateDemo1 = () => {
    const [count, setCount] = useState(0) //不要简单看成函数的调用，这里应该理解为"描述"一个状态

    return <div>
        Count is: {count}
        <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
}
export default StateDemo1
