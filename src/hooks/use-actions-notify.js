import { useSocket, useActions } from '.';

const useActionsNotify = () => {
    const { emit } = useSocket();
    const { joinRoom, sendMessage, leaveRoom } = useActions();

    return {
        joinRoomAndNotify: (user, roomId) => {
            joinRoom(user, roomId);
            emit('joinRoom', roomId);
        },
        leaveRoomAndNotify: (user, roomId) => {
            leaveRoom(user, roomId);
            emit('leaveRoom', roomId);
        },
        sendMessageAndNotify: (fromUserId, toRoomId, msg) => {
            sendMessage(fromUserId, toRoomId, msg);
            emit('message', toRoomId, msg);
        },
    };
};

export default useActionsNotify;
