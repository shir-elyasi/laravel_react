import * as actionTypes from './notes.actions';

const initialState = {
    data: [],
    done: 0,
    sum: 0
}

const notesReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA: {
            const done = action.payload.filter(element => element.completed).length;
            const sum = action.payload.length;

            return { 
                data: action.payload, 
                done, 
                sum 
            };
        }
            
        case actionTypes.ADD_NOTE: {
            return {
                ...state,
                data: state.data.concat(action.note), 
                sum: state.sum + 1
            };
        }

        case actionTypes.UPDATE_NOTE: {
            const { id, title, body, completed } = action;
            const index = state.data.findIndex(element => element.id === id);
            const updatedNotes = [...state.data];
            
            updatedNotes[index]['title'] = title;
            updatedNotes[index]['body'] = body;
            updatedNotes[index]['completed'] = completed;

            let updateDone = 0;
            if (completed) {
                updateDone = updateDone + 1;
            }
            else {
                updateDone = updateDone - 1;
            }

            return {
                ...state,
                data: updatedNotes,
                done: state.done + updateDone
            }
        }

        case actionTypes.CHANGE_DONE: {
            const index = state.data.findIndex(element => element.id === action.id);
            const updatedNotes = [...state.data];
            updatedNotes[index].completed = action.completed;
            let updateDone = 0;
            if (action.completed) {
                updateDone = updateDone + 1;
            }
            else {
                updateDone = updateDone - 1;
            }

            return {
                ...state,
                data: updatedNotes,
                done: state.done + updateDone
            }
        }

        case actionTypes.DELETE_NOTE: {
            const note = state.data.find(element => element.id === action.id);
            const updatedNotes = state.data.filter(element => element.id !== action.id);
            let updateDone = 0; 
            if (note.completed && state.done > 0){
                ++updateDone;
            }
            return { 
                data: updatedNotes,
                done: state.done - updateDone,
                sum: state.sum - 1
            };
        }
        
        default:
        return state;
    }
};

export { notesReducer, initialState }