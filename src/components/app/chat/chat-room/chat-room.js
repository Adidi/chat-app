import React from 'react';

const ChatRoom = ({ room }) => {
    return room.messages.map(message => (
        <div dir="auto" key={message.id}>
            {message.msg}
        </div>
    ));
};

export default React.memo(ChatRoom);
