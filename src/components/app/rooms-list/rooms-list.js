import React from 'react';
import { Button } from 'antd';
import { useStore, useActionsNotify } from '@c/hooks';
import { Header, SList } from '../list.style';

const RoomsList = () => {
    const [state] = useStore();
    const { joinRoomAndNotify } = useActionsNotify();

    const { rooms, me } = state;
    const publicRooms = rooms.filter(room => !room.isPrivate);

    return (
        <>
            <Header>Rooms ({publicRooms.length})</Header>
            <SList
                bordered
                dataSource={publicRooms}
                renderItem={room => (
                    <SList.Item>
                        {`${room.name} ${room.users.length}`}
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
