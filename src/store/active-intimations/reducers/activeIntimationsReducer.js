import { UPDATE_ACTIVE_INTIMATIONS } from '../actions/types';

const activeIntimationsReducer = (activeIntimations = [], { type, payload }) => {
    if (type === UPDATE_ACTIVE_INTIMATIONS) {
        console.log(payload);
        
        return payload;
    }

    return activeIntimations;
}

export default activeIntimationsReducer;
