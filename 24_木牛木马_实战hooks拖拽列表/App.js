import React from 'react'
import "./style.css"
import useDraggable from './component/useDraggable'

const list = [
    {
      src:
        "https://pbs.twimg.com/profile_images/1158985879479705600/UBcPL6GC_400x400.jpg",
      title: "人间模式"
    },
    {
      title: "仙人模式",
      src:
        "https://img1.baidu.com/it/u=2357929912,1608931734&fm=26&fmt=auto&gp=0.jpg"
    },
    {
      title: "尾兽模式",
      src:
        "https://img2.baidu.com/it/u=4206070416,1032157041&fm=26&fmt=auto&gp=0.jpg"
    },
    {
      title: "六道模式",
      src:
        "https://img1.baidu.com/it/u=3483776592,1145385068&fm=26&fmt=auto&gp=0.jpg"
    }
  ];
  
//(10)动态生成className，def是初始的className，conditions是固定长度2的数组：[bool, class名]
function cls(def, ...conditions) {
  const list = [def];
  conditions.forEach((cond) => {
    if (cond[0]) {
      list.push(cond[1]);
    }
  });
  return list.join(" ");//生成className字符串，在style.css中可以找到
}

export default function App() {
    return (
        <div className="App">
            <DraggableList list={list}/>
        </div>
    )
}

//(1)负责根据list数据来渲染整个拖拽组件
function DraggableList({ list }) {
  const {dragList, createDraggerProps, createDropperProps} = useDraggable(list)
  return dragList.map((item, i) => {
    //注意这里对key的设计，key是dragList的Item的自增长ID属性，map方法的i下标是用来做数据运算的
    if(item.type === "BAR") {
      //(8)-1{...createDraggerProps()}需要结构返回的属性对象，把属性布置到组件标签上
      return <Bar id={i} key={item.id} {...createDropperProps(i)}/>
    } else {
      //(8)-2createDropperProps中已经带了key和id,所有这里没有显示声明key和id
      return <Draggable {...createDraggerProps(i)}>
        <Card {...item.data}/>
      </Draggable>
    }
  })

}

//(2)Draggable本身是个包装层,就是用来作为Card的盒子
function Draggable({children, eventhandlers, dragging, id}) {

  //(9)响应一些Html原生拖拽事件
  return (
    <div 
      {...eventhandlers} //9⃣-1把useDraggable中生成的Html拖拽事件挂载到Draggable组件的div标签上
      draggable={true}  //draggable={true}是一个html标签属性，true表示当前标签开启拖拽效果
      className={cls("draggable", [dragging === id, "dragging"])}
    >
      {children}
    </div> 
    )
}

function Bar({id, dragging, dragOver, eventhandlers}) {
  if(id === dragging + 1){
    return null //(11)因为每一个Draggable都被两个Bar夹着，所以拖拽起一个Draggable的同时，既要隐藏拖拽起的Draggable节点，也要消除掉它下方的那个Bar节点
  }
  return (  
    <div 
      {...eventhandlers} 
      className={cls("draggable--bar", [dragging === id, "dragover"])}
    >
      <div
        className="inner"
        style={{
          height: id === dragOver ? "80px" : "0px"
        }}
      />
    </div>
  )

}

//(3)接收的数据和list数据中的对象结构对的上
function Card({src, title}) {
  return (
    <div className="card">
      <img src={src}/>
      <span>{title}</span>
    </div>
  )
}