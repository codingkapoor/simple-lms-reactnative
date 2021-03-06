import { SET_STAGE_INTIMATION_IS_DIRTY } from '../actions/types';

const stageIntimationIsDirtyReducer = (stageIntimationIsDirty = false, { type, payload }) => {
    if (type === SET_STAGE_INTIMATION_IS_DIRTY)
        return payload;

    return stageIntimationIsDirty;
}

export default stageIntimationIsDirtyReducer;
