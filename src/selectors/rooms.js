import { createSelector } from 'reselect';
import { filter } from 'lodash';

const roomsMap = state => state.rooms.map;

export const getActiveRooms = createSelector(
    roomsMap,
    map => filter(map, room => room.active)
);

export const getPublicRooms = createSelector(
    roomsMap,
    map => filter(map, room => !room.isPrivate)
);
