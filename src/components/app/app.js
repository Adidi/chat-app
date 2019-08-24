import React from 'react';
import { Tabs } from 'antd';
import { Layout, Header } from './app.style';

const { Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

const AppLayout = () => {
    return (
        <Layout>
            <Layout>
                <Header>Header</Header>
                <Content>
                    <Tabs defaultActiveKey="1" type="card">
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                    </Tabs>
                </Content>
                <Footer>Adidi</Footer>
            </Layout>
            <Sider style={{ background: 'transparent' }}>
                <div style={{ height: 100, overflowY: 'scroll' }}>
                    <div>safsfasf</div>
                    <div>safsfasf</div>
                    <div>safsfasf</div>
                    <div>safsfasf</div>
                    <div>safsfasf</div>
                </div>
            </Sider>
        </Layout>
    );
};

export default AppLayout;
