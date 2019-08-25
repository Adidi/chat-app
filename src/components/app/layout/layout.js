import React, { useContext } from 'react';
import { Tabs, Button, Input, Row, Col } from 'antd';
import { Layout, Header, Side } from './layout.style';
import { useState } from '@c/hooks';
import UsersList from '../users-list';

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

const AppLayout = () => {
    const [state, dispatch] = useState();
    if (!state.me) {
        return null;
    }
    return (
        <Layout>
            <Layout>
                <Header>Welcome {state.me.name}</Header>
                <Content>
                    <Tabs defaultActiveKey="1" type="card">
                        <TabPane tab="Tab 1" key="1"></TabPane>
                    </Tabs>
                </Content>
                <Footer>
                    <Row type="flex">
                        <Col span="20">
                            <Input placeholder="Start chatting..." />
                        </Col>
                        <Col span="4">
                            <Button
                                onClick={() => {
                                    document.body.style.direction = 'rtl';
                                }}
                            >
                                Send
                            </Button>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
            <Side breakpoint="md" collapsedWidth="0" width={300}>
                <UsersList />
            </Side>
        </Layout>
    );
};

export default AppLayout;
