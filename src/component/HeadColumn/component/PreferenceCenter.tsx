import { Button, Dropdown, Menu, MenuProps, Space } from "antd"
import { DownOutlined, GlobalOutlined, SettingOutlined } from '@ant-design/icons';
import SubMenu from "antd/lib/menu/SubMenu";
import { PerferenceCenterContainer, PerferenceCerterAvator, PerferenceCerterDropdown } from "./style";
import Language from '../../../static/svg/language.svg'
import { useMemo, useRef } from "react";
import { Languages } from "../../../i18n";
import { useTranslation } from "react-i18next";
import { useMemoizedFn } from "ahooks";


const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
    },
    {
      key: '3',
      label: 'Billing',
    },
    {
      key: '4',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
];

export const PerferenceCenter = () => {

    const { i18n } = useTranslation();

    const containerRef = useRef<HTMLDivElement>(null)

    console.log(i18n.language, '==== Language ===')

    const onChangeLanguage = useMemoizedFn((e: any) => {
        console.log(e.key, '==== Language ===')
        i18n.changeLanguage(e.key)
    })

    const menu = useMemo(() => {
        return (
          <Menu
            style={{
                padding: 6,
                borderRadius: 8,
            }}
            onClick={onChangeLanguage}
          >
            {Languages.map((val) => (
              <Menu.Item key={val.value}>{val.name}</Menu.Item>
            ))}
          </Menu>
        );
      }, [Languages]);

    const dropDownOverlap = useMemo(() => {
        return (
            <PerferenceCerterDropdown>
                <PerferenceCerterAvator src={Language}></PerferenceCerterAvator>
            </PerferenceCerterDropdown>
        )
    }, [])
    
    return (
        <PerferenceCenterContainer ref={containerRef}>
            <Dropdown
                getPopupContainer={() => containerRef.current || document.body}
                overlay={menu}
                trigger={['hover']}
                placement="bottom"
                autoAdjustOverflow
                >
                {dropDownOverlap}  
            </Dropdown>
        </PerferenceCenterContainer>
    );
}