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
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="Tab 3" key="4">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="Tab 3" key="5">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="Tab 3" key="6">
                            Content of Tab Pane 3
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
                    <div>safsfasf</div>
                    <div>safsfasf</div>
                    <div>safsfasf</div>
                    <div>safsfasf</div>
                    <div>safsfasf</div>
                    <div>safsfasf</div>
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
