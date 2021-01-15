import * as ActionTypes from './ActionTypes';

export const notes = (state = {
    notes : []
},action) => {
    switch(action.type) {
        case ActionTypes.ADD_NOTE:
            var note = action.payload;
            return {...state,notes:state.notes.concat(note)};
        case ActionTypes.EDIT_NOTE:
            var note = action.payload;
            var indexs = action.index;
            return {...state,notes: state.notes.filter((note,index) => index !== indexs).concat(note)};
        case ActionTypes.DELETE_NOTE:
            var indexs = action.payload;
            return {...state,notes: state.notes.filter((note,index) => index !== indexs)};
        default:
            return state;
    }
}