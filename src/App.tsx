import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import * as actions from './redux/actions';
import Auth from './containers/Auth';
import { LoginDto } from './models';
import { isLoggedInSelector } from './redux/selectors';
import PrivateRoute from './components/PrivateRoute';
import { history } from './helpers/history';
import { Button } from 'semantic-ui-react';
import DashboardLayout from './containers/DashboardLayout';

// const Dashboard = () => {
//   return (
//     <React.Fragment>
//       <h1>Dashboard, nigga</h1>
//       <Button
//         onClick={() => {
//           localStorage.removeItem('accessToken');
//         }}
//       />
//     </React.Fragment>
//   );
// };

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <PrivateRoute path="/dashboard" component={DashboardLayout} />
          <Route path="/login" component={Auth} />
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: isLoggedInSelector(state),
});
export default App;
