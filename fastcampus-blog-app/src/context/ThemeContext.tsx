import { ReactNode, useState } from "react";
import { createContext } from "vm";

const ThemeContext = createContext({
    theme : 'light',
    toggleMode : ()=>{},
});

interface ThemeProps {
    children : ReactNode;
}
export const ThemeContextProvider = ({children}:ThemeProps)=>{
    const [theme,setTheme] = useState('light');
    const toggleMode = ()=>{
        setTheme((prev)=>prev==='light' ? 'dark' : 'light');

    }
    return <ThemeContext.Provider value={{theme,toggleMode}}>
        {children}
    </ThemeContext.Provider>
};