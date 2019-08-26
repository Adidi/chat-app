import React from 'react';
import size from 'lodash/size';
import { Button } from 'antd';
import { useStore, useSocket, useActionsNotify, useActions } from '@c/hooks';
import { Header, SList } from '../list.style';

const UsersList = () => {
    const [state] = useStore();
    const { startPrivateChat } = useActions();
    const { emit } = useSocket();

    const { rooms, users, currentRoom } = state;

    const room = rooms.find(r => r.id === currentRoom);

    return (
        <>
            <Header>Users ({size(room.users)})</Header>
            <SList
                bordered
                dataSource={room.users}
                renderItem={userId => {
                    const user = users[userId];
                    return (
                        <SList.Item>
                            {user.name}
                            <Button
                                size="small"
                                onClick={() => {
                                    emit('startPrivateChat', user);
                                }}
                            >
                                Private
                            </Button>
                        </SList.Item>
                    );
                }}
            />
        </>
    );
};

export default UsersList;
