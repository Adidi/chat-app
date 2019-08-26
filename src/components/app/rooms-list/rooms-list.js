import React from 'react';
import { Button } from 'antd';
import { useStore, useActionsNotify } from '@c/hooks';
import { Header, SList } from '../list.style';

const RoomsList = () => {
    const [state] = useStore();
    const { joinRoomAndNotify } = useActionsNotify();

    const { rooms, me } = state;

    return (
        <>
            <Header>Rooms ({rooms.length})</Header>
            <SList
                bordered
                dataSource={rooms}
                renderItem={room => (
                    <SList.Item>
                        {room.name}
                        <Button
                            size="small"
                            onClick={() => {
                                joinRoomAndNotify(me, room.id);
                            }}
                        >
                            Join
                        </Button>
                    </SList.Item>
                )}
            />
        </>
    );
};

export default RoomsList;
