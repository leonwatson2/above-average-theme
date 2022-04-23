import { createContext, useContext } from 'react'

export const ThemeContext = createContext({light: true})
export const useThemeContext = () => useContext(ThemeContext);
