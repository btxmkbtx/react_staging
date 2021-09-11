import React, { useState, useEffect } from 'react'

function log(count) {
    console.log(`2_effectHooks demo1 : you clicked ${count} times`)
}

function log2(count) {
    console.log(`log2是不是每十次打印一次？${count%10===0?"是的！":"不是..."}`)
}

function log3(count) {
    console.log(`log3是不是每十次打印一次？${count%10===0?"是的！":"不是..."}`)
}

const EffectDemo1 = () => {

    const [count, setCount] = useState(0) 

    //如何理解这个语义？：依赖[空]变化的作用，而空不会自动变化，所以只执行一次
    useEffect(log.bind(null, count), [])

    //每执行十次后台打印一次
    useEffect(log2.bind(null, count), [Math.floor(count / 10)])

    //下面这个是错误算法,因为作用的发生取决于依赖的变化，而不是依赖的值本身，所以10增加到11的时候，true变成了false，依赖改变了，所以作用发生了
    useEffect(log3.bind(null, count), [count % 10 === 0])


    return <div>
        <p>you clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>clike me</button>
    </div>
}
export default EffectDemo1
