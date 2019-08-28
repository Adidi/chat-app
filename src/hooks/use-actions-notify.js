import { useSocket, useActions } from '.';

const useActionsNotify = () => {
    const { emit } = useSocket();
    const { joinRoom, message, leaveRoom } = useActions();

    return {
        joinRoomAndNotify: (user, roomId) => {
            joinRoom(user, roomId);
            emit('joinRoom', roomId);
        },
        leaveRoomAndNotify: (user, roomId) => {
            leaveRoom(user, roomId);
            emit('leaveRoom', roomId);
        },
        messageAndNotify: (fromUserId, toRoomId, msg) => {
            message(fromUserId, toRoomId, msg);
            emit('message', toRoomId, msg);
        }
    };
};

export default useActionsNotify;
