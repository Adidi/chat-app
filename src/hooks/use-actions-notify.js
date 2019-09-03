import { useSocket, useActions } from '.';

const useActionsNotify = () => {
    const { emit } = useSocket();
    const { joinRoom, message, leaveRoom } = useActions();

    return {
        joinRoomAndNotify: (userId, roomId) => {
            joinRoom(userId, roomId);
            emit('joinRoom', roomId);
        },
        leaveRoomAndNotify: (userId, roomId) => {
            leaveRoom(userId, roomId);
            emit('leaveRoom', roomId);
        },
        messageAndNotify: (fromUserId, toRoomId, msg) => {
            message(fromUserId, toRoomId, msg);
            emit('message', toRoomId, msg);
        }
    };
};

export default useActionsNotify;
