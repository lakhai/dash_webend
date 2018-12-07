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
import Quests from '../Quests';
import Journal from '../Journal';
import Profile from '../Profile';
import Feeds from '../Feeds';
import Feed from '../Feed';
import SongBook from '../SongBook';

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
              <PrivateRoute exact={true} path="/dashboard/" component={Dashboard} />
              <PrivateRoute exact={true} path="/dashboard/goals" component={Goals} />
              <PrivateRoute exact={true} path="/dashboard/quests" component={Quests} />
              <PrivateRoute exact={true} path="/dashboard/journal" component={Journal} />
              <PrivateRoute path="/dashboard/feeds/:id" component={Feed} />
              <PrivateRoute exact={true} path="/dashboard/feeds" component={Feeds} />
              <PrivateRoute exact={true} path="/dashboard/profile" component={Profile} />
              <PrivateRoute exact={true} path="/dashboard/song-book" component={SongBook} />
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
export default withRouter(connect(null, mapDispatchToProps)(DashboardLayout));
