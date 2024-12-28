import { atom, useAtom, useSetAtom } from 'jotai';

/* eslint-disable no-unused-vars */
export enum Theme {
  Light = 'light',
  Night = 'night',
}
/* eslint-disable no-unused-vars */

// 1. 定义全局状态 atom
export const globalStoreAtom = atom({
    theme: 'light',       
    isLoggedIn: false,   
  });
  
// 定义 readTheme Atom，用来读取和更新 theme
export const ThemeAtom = atom(
  // 读取 theme 状态
  (get) => get(globalStoreAtom).theme,

  // 更新 theme 状态
  (get, set, newTheme: Theme) => {
    set(globalStoreAtom, (prevState) => ({
      ...prevState,
      theme: newTheme,
    }));
  }
);

export const useTheme = () => {
    return useAtom(ThemeAtom)[0];  // 返回 theme
};

export const useSetTheme = () => useSetAtom(ThemeAtom);

export const useThemeAtom = () => useAtom(ThemeAtom);


// 更新登录状态
export const setIsLoggedIn = (set, loggedIn) => {
  set(globalStoreAtom, (prevState) => ({
    ...prevState,
    isLoggedIn: loggedIn,
  }));
};



// 读取登录状态
export const readIsLoggedIn = (get) => get(globalStoreAtom).isLoggedIn;

