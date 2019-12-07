import _ from 'lodash';

import { platform } from '../../../common/apis';
import { FETCH_INACTIVE_INTIMATIONS } from './types';

const fetchInactiveIntimations = () => async (dispatch, getState) => {
    
    const { employeeDetails } = getState();
    let res = await platform.get(`/employees/${employeeDetails.id}/intimations`);
    let inactiveIntimations = res.data;

    let payload = inactiveIntimations;

    dispatch({
        type: FETCH_INACTIVE_INTIMATIONS,
        payload
    });

};

export default fetchInactiveIntimations;
