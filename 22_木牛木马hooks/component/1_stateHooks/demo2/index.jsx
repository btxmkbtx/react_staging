import React, { useState } from 'react'

/*
把行为封装到状态中,使状态成为行为
这个例子能够达到和demo1同样的效果，但是在语义上有所不同，这种封装使得状态更像行为
也就是我们封装的是count+1的这个行为，它就在useCount这一个程序块中，
这就把数据和行为关联了起来，而且是一种强关联，而这个数据行为和UI之间是弱关联，
这样UI与行为就形成了解耦，UI不需要关心行为，只需要渲染行为之后的状态
 */
function useCount(initalize) {
    const [count, setCount] = useState(initalize) 

    return [
        count, 
        () => {
            setCount(count => count + 1)
        }
    ]
}

const StateDemo2 = () => {
    const [count, addCount] = useCount(0) 

    return <div>
        Count is: {count}
        <button onClick={() => addCount()}>Add</button>
    </div>
}

export default StateDemo2
