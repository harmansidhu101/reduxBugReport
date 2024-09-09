let lastId = 0;

function reducer (state = [], action){
    switch(action.type){
        case "bugAdded":
            return [
                ...state,
                { 
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ]
        case "bugRemoved":
            return state.filter(bug => bug.id !== Number(action.payload.id))
        case "bugResolved":
            return state.map(bug => bug.id !== Number(action.payload.id) ? bug : {...bug, resolved: true});
        case "bugRemoveAll":
            return [];
        default:
            return state
    }
}

export default reducer