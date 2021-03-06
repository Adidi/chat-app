import React, { useState } from 'react';
import { Tabs, Button, Input, Row, Col } from 'antd';
import { useStore, useActions, useActionsNotify } from '@c/hooks';
import { getActiveRooms, getMe } from '@c/selectors';
import UsersList from '../users-list';
import RoomsList from '../rooms-list';
import ChatRoom from '../chat/chat-room';
import { AppLayout, Header, Side } from './layout.style';

const { Content, Footer } = AppLayout;
const { TabPane } = Tabs;

const Layout = () => {
    const [msg, setMsg] = useState('');
    const [state] = useStore();
    const { changeRoom } = useActions();
    const { messageAndNotify, leaveRoomAndNotify } = useActionsNotify();
    const { currentRoom } = state;

    const activeRooms = getActiveRooms(state);
    const me = getMe(state);

    return (
        <AppLayout>
            <AppLayout>
                <Header>Welcome {me.name}</Header>
                <Content>
                    <Tabs
                        hideAdd
                        activeKey={currentRoom}
                        type="editable-card"
                        onChange={changeRoom}
                        onEdit={(roomId, action) => {
                            if (action === 'remove') {
                                leaveRoomAndNotify(me.id, roomId);
                            }
                        }}
                    >
                        {activeRooms.map((room, i) => (
                            <TabPane
                                closable={i !== 0}
                                tab={room.name}
                                key={room.id}
                            >
                                <ChatRoom room={room} />
                            </TabPane>
                        ))}
                    </Tabs>
                </Content>
                <Footer>
                    <Row type="flex">
                        <Col span={23}>
                            <Input
                                placeholder="Start chatting..."
                                value={msg}
                                onChange={e => setMsg(e.target.value)}
                            />
                        </Col>
                        <Col span={1}>
                            <Button
                                onClick={() => {
                                    messageAndNotify(me.id, currentRoom, msg);
                                    setMsg('');
                                }}
                            >
                                Send
                            </Button>
                        </Col>
                    </Row>
                </Footer>
            </AppLayout>
            <Side breakpoint="md" collapsedWidth="0" width={300}>
                <UsersList />
                <RoomsList />
            </Side>
        </AppLayout>
    );
};

export default Layout;
