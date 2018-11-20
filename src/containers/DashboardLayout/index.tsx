import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Icon,
  Sidebar,
} from 'semantic-ui-react';
import TopNavigation from '../../components/TopNavigation';
import HorizontalSidebar from '../../components/HorizontalSidebar';
import PrivateRoute from '../../components/PrivateRoute';
import { AuthActions } from '../../redux/actions';
import Dashboard from '../Dashboard';
import Goals from '../Goals';

import './styles.css';
import { isNullOrUndefined } from 'util';

interface Props {
  history: any;
  getUserInfo: () => void;
}
interface State {
  isSidebarOpen: boolean;
}

class DashboardLayout extends React.Component<Props, State> {
  state = {
    isSidebarOpen: false,
  };

  componentDidMount() {
    this.props.getUserInfo();
  }

  toggleSidebar = () => this.setState({ isSidebarOpen: !this.state.isSidebarOpen });

  logOut = () => {
    localStorage.removeItem('accessToken');
    this.props.history.push('/login');
  }

  render() {
    const { isSidebarOpen } = this.state;
    const pusherClass = isSidebarOpen ? 'sideBarOpen' : 'sideBarClosed';
    return (
      <Container id="dashboard" fluid={true}>
        <TopNavigation toggleSidebar={this.toggleSidebar} />
        <Sidebar.Pushable as={Segment} padded={false} style={{ marginTop: '0' }} basic={true}>
          <HorizontalSidebar logout={this.logOut} isOpen={isSidebarOpen} />
          <Sidebar.Pusher className={pusherClass}>
            <Segment basic={true}>
              <PrivateRoute exact={true} path="/dashboard/" component={Dashboard} />
              <PrivateRoute exact={true} path="/dashboard/goals" component={Goals} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(AuthActions.getUserInfo()),
});
export default connect(null, mapDispatchToProps)(withRouter(DashboardLayout));
