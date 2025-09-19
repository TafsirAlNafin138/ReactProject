import {createContext, useContext} from 'react';

const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {}
});

const ThemeProvider = ThemeContext.Provider;

function useTheme(){
    return useContext(ThemeContext)
}

export { ThemeProvider, useTheme };