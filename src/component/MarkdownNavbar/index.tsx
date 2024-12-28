
import './index.less'
import 'markdown-navbar/dist/navbar.css'
import { NavBar } from '../NavBar'
import { useTranslation } from 'react-i18next';

const MakedownNavbar = (props: { source: string; className: string, theme:string}) => {
    const { source, className } = props

    const { t } = useTranslation()

    return (
        <div className={className}>
            <div
                style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    padding: '20px 10px 10px 10px',
                    borderBottom: '2px solid rgba(0,0,0,0.06)'
                }}
            >
                {t('markdown_navbar')}
            </div>
            <NavBar theme={props.theme} src={source}></NavBar>
        </div>
    )
}
export default MakedownNavbar
