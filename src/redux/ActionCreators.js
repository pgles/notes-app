import * as ActionTypes from './ActionTypes';

export const addNote = (note) => ({
    type: ActionTypes.ADD_NOTE,
    payload: note
});

export const editNote = (note,index) => ({
    type: ActionTypes.EDIT_NOTE,
    payload: note,
    index: index
});

export const deleteNote = (index) => ({
    type: ActionTypes.DELETE_NOTE,
    payload: index
});