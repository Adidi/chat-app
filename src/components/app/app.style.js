import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';

const { Header: AntHeader } = AntLayout;

export const Header = styled(AntHeader)`
    background: transparent;
`;

export const Layout = styled(AntLayout)`
    && {
        min-height: 100vh;
        background: transparent;
    }
`;
