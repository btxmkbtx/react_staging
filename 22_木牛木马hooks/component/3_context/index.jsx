import React, { useState, useContext } from 'react'

//白天模式和夜间模式的主题
const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }, 
}

//穿件一个上下文，作为所有组件的背景知识
const ThemeContext = React.createContext({
    theme: themes.light,
    toggle: () => {}
})

const ContextDemo1 = () => {

    //如果要允许context中的theme可以改变，那么theme就应该是一个状态
    const [theme, setTheme] = useState(themes.light) 
    //context的Provider组件可以向包含的所有子组件传递上下文，无需我们再通过props手动传递
    return <ThemeContext.Provider value={{ //context的value需要重写，如果要允许context中的theme可以改变，那么theme就应该是一个状态
        theme,
        toggle: () => {
            setTheme(theme => 
                theme === themes.light?themes.dark:themes.light
            )
        }
    }}>
        <Toolbar/>
    </ThemeContext.Provider>
}
export default ContextDemo1

const Toolbar = () => {
    return <ThemeButton/>
}

const ThemeButton = () => {
    const themeContext = useContext(ThemeContext)//从上下文中取出我们需要的背景知识
    return <button 
    style={{
        color: themeContext.theme.foreground,
        backgroundColor: themeContext.theme.background
    }}
    onClick={() => {
        themeContext.toggle()
    }}>切换主题</button>
}

