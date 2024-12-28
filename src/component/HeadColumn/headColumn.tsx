import { useTranslation } from "react-i18next";
import { Head } from "../../page/fontpage/component/Head/Head";
import { Theme, useThemeAtom } from "../../state/globalState"
import moon from '../../static/svg/moon.svg'
import sun from '../../static/svg/sun.svg'
import { PerferenceCenter } from "./component/PreferenceCenter";
import { useRef } from "react";

export const HeadColumn = () => {

    const [theme, setTheme] = useThemeAtom()

    const { t } = useTranslation();

    const headColumn = useRef<HTMLDivElement>(null)

    console.log(headColumn.current, '=== headColumn ====')

    return (
        <Head
            ref={headColumn}
            UnAppearUrl={["/live/dream", "/login", "/canvas", "/study/words/recite"]}
            theme={theme}
            HeadNameArray={[
                [t('fontpage'), '/'],
                [
                    t('blog'),
                    '/blog',
                    [
                        [t('new'), '/blog/new'],
                        [t('browse'), '/blog']
                    ]
                ],
                [
                    t('note'),
                    '/note',
                    [
                        [t('new'), '/note/new'],
                        [t('browse'), '/note']
                    ]
                ],
                [t('live'), '/live', [
                    // ["新建", "live/new"],
                    // ["心愿", "live/dream"],
                    [t("cube"), "live/cube"],
                    [t("calendar"), "live/calendar"]
                ]],
                // ['动画', '/canvas'],
                // [  
                //     '学习', '/study', [
                //         ["单词", "study/words"]
                //     ]
                // ],
                [t('login'), "/login"],
                ['Github', 'https://github.com/zhanglinghua123'],
                <PerferenceCenter key={"PerferenceCenter"} />,
                <img
                    key={"img"}
                    onClick={() => {
                        setTheme(theme === Theme.Night ? Theme.Light : Theme.Night)
                    }}
                    src={theme === Theme.Night ? moon : sun}
                    style={{ width: '18px', height: '18px' }}
                    alt="moon"
                />,
            ]}
        ></Head>
    )
}


