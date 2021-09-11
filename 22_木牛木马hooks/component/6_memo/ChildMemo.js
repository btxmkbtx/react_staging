import React, { memo, } from 'react';

//相当于类组件中重写shouldCompenentUpdate的效果
const isEqual = (prevProps, nextProps) => {
    if (prevProps.number !== nextProps.number) {
        return false;
    }
    return true;
}

// 这个子组件使用了 React.memo 进行了包装，
// 并且通过 isEqual 方法判断只有当两次 props 的 number 不同的时候才会重新触发渲染，否则 console.log 也不会执行。
export default memo((props = {}) => {
    console.log(`--- memo re-render ---`);
    return (
        <div>
            {/* <p>step is : {props.step}</p> */}
            {/* <p>count is : {props.count}</p> */}
            <p>ChildMemo recive number : {props.number}</p>
        </div>
    );
}, isEqual);