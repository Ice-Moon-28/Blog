/* eslint-disable no-unused-vars */
import React, {  useEffect, useState } from 'react'
import { FontPage } from './page/fontpage'
import { Head } from './page/fontpage/component/Head/Head'

import { BrowserRouter,  Route,  Routes } from 'react-router-dom'
import { Blog } from './page/blog/all'
import { NewNote } from './page/note/new/index'
import { AllNote } from './page/note/all'
import { BlogPre } from './page/blog/blogmarkdown'
import { Live } from './page/live'
import { NewBlog } from './page/blog/new'
import 'antd/dist/antd.css'
import { AddClickOnHeart } from './component/ClickHeart'
import { Friend } from './page/friend'
import { Dream } from './page/live/dream'
import { AuthMessage, ForMatSessionStorageIntoString, UserAuth } from './component/MyRouteGuard'
import { MyRouteGuard } from './component/MyRouteGuard'
import { Login } from './page/login'
import { ModifyNote } from './page/note/modify'
import { ModifyBlog } from './page/blog/modify'
import { Cube } from './page/live/magic_cube'
import { CalendarPage } from './page/calendar'
import { Words } from './page/study/words'
import { Recite } from './page/study/recite'
import { Theme, useSetTheme, useThemeAtom } from './state/globalState'
import { HeadColumn } from './component/HeadColumn/headColumn'

function App() {
    let modelname = 'hijiki'
    useEffect(() => {
        const registerLive2d = () => {
            if ((window as any).L2Dwidget) {
                (window as any).L2Dwidget.init({
                    pluginRootPath: 'live2dw/', // 指向你的目录
                    pluginJsPath: 'lib/', // 指向你的目录
                    // pluginModelPath: 'live2d-widget-model-nico/assets/',                                   //中间这个koharu就是你的老婆,想换个老婆,换这个就可以了
                    tagMode: false,
                    debug: false,
                    // hibiki 是jk hijiki 是黑猫猫
                    // izumi 中年妇女 kahuru Q版女孩子
                    // wanko 是笨狗
                    // tororo 白猫
                    model: {
                        jsonPath: `/live2dw/live2d-widget-model-${modelname}/assets/${modelname}.model.json`
                    }, // 中间这个koharu就是你的老婆,想换个老婆,换这个就可以了
                    display: {
                        position: 'left',
                        width: window.innerHeight * 0.16,
                        height: window.innerHeight * 0.16,
                        hOffset: 60, // canvas水平偏移
                        vOffset: 100, // canvas垂直偏移
                        opacity: 0.6
                    }, // 调整大小,和位置
                    mobile: { show: true }, // 要不要盯着你的鼠标看
                    log: false
                })
            }
        }
        let timer 
        const timeoutRegisterLive2d = function() {
            // 注销之前的定时器
            if(timer) 
                clearInterval(timer)
            
            timer = setInterval(() => {
                if ((window as any).L2Dwidget) {
                    registerLive2d()
                    clearInterval(timer)
                    timer = undefined
                }
            }
            , 1000)
        
        }
        timeoutRegisterLive2d()
        let timerTwo 
        const windowOnresize = () => {
            if(!timerTwo)
            {
                timerTwo = setTimeout(() => {
                    timeoutRegisterLive2d()
                    clearTimeout(timerTwo)
                    timerTwo = undefined
                }, 1000)
            }
        }
        //  触发 更新
        window.addEventListener("resize", windowOnresize)
        return () => window.removeEventListener("resize", windowOnresize)
        // }, 300);
    }, [modelname])
    // 添加点击爱心效果
    useEffect(() => {
        AddClickOnHeart()
    }, [])
    //  用来设置夜间模式
    const [theme, setTheme] = useThemeAtom()

    //  当前的用户权限
    console.log(ForMatSessionStorageIntoString(sessionStorage.getItem("auth")), "权限码")
    const [UserState, SetUserState] = useState<UserAuth>(ForMatSessionStorageIntoString(sessionStorage.getItem("auth")))
    return (
        <BrowserRouter>
            <AuthMessage.Provider value={UserState}>
                {/* 不需要权限校验的url */}
                <Routes>
                    <Route path="/" element={<MyRouteGuard></MyRouteGuard>}>
                        <Route path="/" element={<FontPage isNight={theme === Theme.Night} />} />
                        <Route path="/canvas" element={<Friend></Friend>}></Route>
                        <Route path="/login" element={<Login SetUserState={SetUserState} theme={theme}></Login>}></Route>
                    </Route>
                    <Route path="/blog" element={<MyRouteGuard></MyRouteGuard>}>
                        <Route path="/blog/:id" element={<BlogPre theme={theme === Theme.Night} />} />
                        <Route path="/blog" element={<Blog theme={theme === Theme.Night} />} />
                        <Route path="/blog/new" element={<MyRouteGuard></MyRouteGuard>}>
                            <Route
                                path="/blog/new"
                                element={
                                    <NewBlog placeholder="编辑你的新博客吧!完成后输入esc" theme={theme === Theme.Night} />
                                }
                            />
                        </Route>
                        <Route path="/blog/modify/:id" element={<MyRouteGuard></MyRouteGuard>}>
                            <Route
                                path="/blog/modify/:id"
                                element={
                                    <ModifyBlog placeholder="编辑你的新博客吧!完成后输入esc" theme={theme === Theme.Night} />
                                }
                            />
                        </Route>
                    </Route>
                    <Route path="/note" element={<MyRouteGuard></MyRouteGuard>}>
                        <Route
                            path="/note"
                            element={<AllNote theme={theme}/>}
                        ></Route>
                        <Route path="/note/new" element={<MyRouteGuard></MyRouteGuard>}>
                            <Route
                                path="/note/new"
                                element={
                                    <NewNote placeholder="编辑你的新笔记吧!完成后输入esc" theme={theme === Theme.Night} />
                                }
                            />
                        </Route>
                        <Route path="/note/modify" element={<MyRouteGuard></MyRouteGuard>}>
                            <Route
                                path="/note/modify/:id"
                                element={
                                    <ModifyNote placeholder="编辑你的笔记吧!完成后输入esc" theme={theme === Theme.Night} />
                                }
                            />
                        </Route>
                    </Route>
                    <Route path="/live" element={<MyRouteGuard></MyRouteGuard>}>
                        <Route path="/live" element={<Live theme={theme} />} />
                        <Route path="/live/dream" element={<Dream></Dream>}></Route>
                        <Route
                            path="/live/new"
                            element={
                                <NewBlog newUrl="/life/newLife" placeholder="编辑你的新博客吧!完成后输入esc" theme={theme === Theme.Night} />
                            }
                        />
                        <Route
                            path="/live/modify/:id"
                            element={
                                <ModifyBlog placeholder="编辑你的新博客吧!完成后输入esc" theme={theme === Theme.Night} />
                            }
                        />
                        <Route 
                            path="/live/cube"
                            element={<Cube></Cube>}>
                        </Route>
                        <Route
                            path="/live/calendar"
                            element={<CalendarPage></CalendarPage>}
                        >
        
                        </Route>
                    </Route>
                    <Route path="/study">
                        <Route path="/study/words" element={<Words></Words>}></Route>
                        <Route path="/study/words/recite" element={<Recite></Recite>}></Route>
                    </Route>
                </Routes>
                <div className="App">
                    {/* 顶部的导航栏 */}
                    <HeadColumn />
                </div>
            </AuthMessage.Provider>
        </BrowserRouter>
    )
}

export default App
