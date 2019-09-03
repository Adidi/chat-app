import React from 'react';
import { Button } from 'antd';
import { useStore, useSocket } from '@c/hooks';
import { Header, SList } from '../list.style';

const UsersList = () => {
    const [state] = useStore();
    const { emit } = useSocket();

    const { rooms, users, currentRoom, userId } = state;

    const room = rooms.map[currentRoom];
    const roomUsersWithoutMe = room.users.filter(uid => uid !== userId);

    return (
        <>
            <Header>Users ({roomUsersWithoutMe.length})</Header>
            <SList
                bordered
                dataSource={roomUsersWithoutMe}
                renderItem={userId => {
                    const user = users[userId];
                    return (
                        <SList.Item>
                            {user.name}
                            <Button
                                size="small"
                                onClick={() => {
                                    emit('startPrivateChat', user.id);
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
