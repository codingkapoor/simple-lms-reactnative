import { connect } from 'react-redux';
import { fetchEmployeeDetails } from '../../store/employee-details/actions';
import { fetchActiveIntimations } from '../../store/active-intimations/actions';
import FeedScreen from './FeedScreen';

const mapStateToProps = ({ activeIntimations, pullToRefresh }) => {
    return { activeIntimations, pullToRefresh };
};

export default connect(mapStateToProps, { fetchActiveIntimations, fetchEmployeeDetails })(FeedScreen);
