//这个例子展示了如何标准的封装状态的行为与作用
import React, {useState, useEffect} from 'react'

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

//模仿一个异步请求
async function getPerson() {

    await sleep(1000)
    return ["张三", "赵四", "王五"]
    
}

//可以看到我们封装的usePerson放回的其实就是一个状态，而这个状态就是我们要渲染的对象
function usePerson() {

    //getPerson拿到的list是用于UI展示的，所以定义为一个状态
    const [list, setList] = useState(null)

    
    async function request() {
        const personList = await getPerson()
        setList(personList)//setList就是状态背后的行为，行为使用的数据是通过一个发起请求的作用拿到的
    }
    //因为请求的动作在UI中无法感知, 请求通常认为是一个作用
    useEffect(request, [])

    return list
    
}

//作用request和状态行为([list, setList])都封装在了usePerson这个hooks里了，暴露给UI的只有一个叫usePerson的hook
export default () => {
    const list = usePerson()
    if(list === null) {
        return <div>loading...</div>
    }
    return <div>
        {list.map((name, i) => {
            return <li key={i}>{name}</li>
        })}
    </div>
}