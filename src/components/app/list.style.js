import styled from 'styled-components';
import { List } from 'antd';

export const Header = styled.div`
    font-weight: bold;
    display: flex;
    height: 30px;
    justify-content: center;
    align-items: center;
`;

export const SList = styled(List)`
    height: calc(50vh - 30px);
    overflow-y: auto;
`;
