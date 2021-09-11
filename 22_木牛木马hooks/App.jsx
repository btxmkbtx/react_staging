import React, { Component } from 'react'
import StateHooksDemo1 from "./component/1_stateHooks/demo1";
import StateHooksDemo2 from "./component/1_stateHooks/demo2";
import EffectHooksDemo1 from "./component/2_effectHooks/demo1";
import EffectHooksDemo2 from "./component/2_effectHooks/demo2";
import ContextDemo1 from "./component/3_context"
import ReducerDemo1 from "./component/4_reducer"
import UseHooks from "./component/5_useHooks_counter"
import MemoDemo from "./component/6_memo"
import UseMemoDemo from "./component/7_useMemo"
import HooksOfReduxDemo from "./component/8_hooksOfRedux"

export default class App extends Component {

    render() {

        return (
            <div>
                <div>
                    <h1>state hooks demo1</h1>
                    <StateHooksDemo1/>
                    <h1>state hooks demo2</h1>
                    <StateHooksDemo2/>
                    <h1>effect hooks demo1</h1>
                    <EffectHooksDemo1/>
                    <h1>effect hooks demo2</h1>
                    <EffectHooksDemo2/>
                    <h1>context demo</h1>
                    <ContextDemo1/>
                    <h1>reducer demo</h1>
                    <ReducerDemo1/>
                    <h1>自定义hooks demo</h1>
                    <UseHooks/>
                    <h1>memo demo</h1>
                    <MemoDemo/>
                    <h1>useMemo demo</h1>
                    <UseMemoDemo/>
                    <h1>hooks of redux</h1>
                    <HooksOfReduxDemo/>
                </div>
            </div>
        )
    }
}
