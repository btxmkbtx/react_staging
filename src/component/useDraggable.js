import {useState} from 'react'

//(6)-2定义两种Listitem类型
const DRAGGABLE = "DRAGGABLE"
const BAR = "BAR"

//(6)-1封装拖拽列表的每一行Draggable组件
function draggable(item, id) {
    return {
        type: DRAGGABLE,
        id,
        data: item
    }
}

//(5)-2初始化状态dragList
function insertBars(list) {
    let i = 0//自增长ID

    //定义Bar组件信息结构
    const newBar = () => {
        return {
            type: BAR,
            id: i++
        }
    }

    // 把原始的App中list数据改装成[Bar][Draggable][Bar][Draggable]...[Bar]结构
    //利用数组的连接函数concat，以Bar起头，以Bar结尾
    return [newBar()].concat(
        //展开[[draggable,newBar],[draggable,newBar],...] => [draggable,newBar],[draggable,newBar],...
        ...list.map(item => {
            return [draggable(item, i++), newBar()]
        })
    )
}

//(12)-2为什么要制定这个交换卡片的算法呢？
//是为了让整个list的key不因为卡片的位置移动发生改变，卡片移动只改变了key的背后指向的卡片信息
function clacChanging(list, dragId, dropId) {
    list = list.slice()//拷贝一个新数组,可以保护一下原数组

    const dragItem = list[dragId] //从元list中拿到被拖拽节点的对象信息

    // dir <0 从上往下； dir > 0从下往上 
    const dir = dragId > dropId ? -2 : 2;
    // drop的地方是bar，end是Bar后面的Draggable坐标
    const end = dir > 0 ? dropId - 1 : dropId + 1;

    for (let i = dragId; i != end; i += dir) {
        list[i] = list[i + dir];
    }

    list[end] = dragItem;
    return list;
}

//(4)封装状态dragList,dragOver,dragging
export default function useDraggable(list) {
    //(5)-1
    const [dragList, setDragList] = useState(() => {
        return insertBars(list)
    })
    //(7)-1
    const [dragOver, setDragOver] = useState(null);//被拖拽中的Draggable节点ID
    const [dragging, setDragging] = useState(null);//被拖拽中的图片所停留的Bar节点ID
        
    return {
        dragList,
        createDropperProps : id => { //(7)-2把用来拖拽释放的Bar组件的属性和HtmlEvent生成出来
            return {
                dragging, //被拖拽中的Draggable节点ID
                dragOver, //被拖拽中的图片所停留的Bar节点ID
                eventhandlers : {
                    onDragOver: (e) => { //原生Event查看：https://www.runoob.com/jsref/event-ondragover.html
                        e.preventDefault()
                        setDragOver(id)
                    },
                    onDragLeave: (e) => { //原生Event查看：https://www.runoob.com/jsref/event-ondragleave.html
                        e.preventDefault()
                        setDragOver(null)
                    },
                    //(12)拖拽卡片被放下，这是我们一个拖拽操作的结束点
                    onDrop: (e) => { //原生Event查看：https://www.runoob.com/jsref/event-ondrop.html
                        e.preventDefault()
                        setDragOver(null)
                        setDragList(list => {
                            return clacChanging(list, dragging, id)//(12)-1交换卡片的位置
                        })
                    }
                }
            }
        },
        createDraggerProps : id => { //(7)-3把用来拖拽的Draggable组件的属性和HtmlEvent生成出来
            return {
                id,
                key: id,
                dragging, //被拖拽中的Draggable节点ID
                eventhandlers : {
                    onDragStart: () => { //dragging的一个作用:拖拽开始； 原生Event查看：https://www.runoob.com/jsref/event-ondragstart.html
                        console.log("拖拽开始")
                        setDragging(id)
                    },
                    onDragEnd: () => { //dragging的另一个作用:拖拽结束； 原生Event查看：https://www.runoob.com/jsref/event-ondragend.html
                        console.log("拖拽结束")
                        setDragging(null)
                    }
                }
            }
        }
    }
}