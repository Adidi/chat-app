import React from 'react';
import size from 'lodash/size';
import { List, Button } from 'antd';
import { useState } from '@c/hooks';
import { Header } from './users-list.style';

const UsersList = () => {
    const [state] = useState();

    console.log('state', state);
    const { rooms, users, me } = state;
    if (!rooms[0]) {
        return null;
    }

    const { users: roomUsers } = rooms[0];
    const filteredUsers = roomUsers.filter(user => user !== me.id);

    return (
        <List
            header={<Header>Users ({size(users) - 1})</Header>}
            bordered
            dataSource={filteredUsers}
            renderItem={item => (
                <List.Item>
                    {users[item].name}
                    <Button size="small">Private</Button>
                </List.Item>
            )}
        />
    );
};

export default UsersList;
