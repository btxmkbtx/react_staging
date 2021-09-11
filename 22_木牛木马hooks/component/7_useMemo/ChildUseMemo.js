import React, { useMemo } from 'react';

//场景:我们只是希望 component 的部分不要进行 re-render，而不是整个 component 不要 re-render，也就是要实现 局部 Pure 功能。

// useMemo() 基本用法如下：
// const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
// useMemo() 返回的是一个 memoized 值，只有当依赖项（比如上面的 a,b 发生变化的时候，才会重新计算这个 memoized 值）
// memoized 值不变的情况下，不会重新触发渲染逻辑。
// 说起渲染逻辑，需要记住的是 useMemo() 是在 render 期间执行的，所以不能进行一些额外的副操作，比如网络请求等。
// 如果没有提供依赖数组（上面的 [a,b]）则每次都会重新计算 memoized 值，也就会 re-render
export default (props = {}) => {
    console.log(`--- component re-render ---`);
    return useMemo(() => {
        console.log(`--- useMemo re-render ---`);
        return <div>
            {/* <p>step is : {props.step}</p> */}
            {/* <p>count is : {props.count}</p> */}
            <p>number is : {props.number}</p>
        </div>
    }, [props.number]);
}