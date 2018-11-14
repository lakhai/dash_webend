import * as React from 'react';
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

interface Props {
  history: any;
}
// interface State { }

class Dashboard extends React.Component<Props, {}> {
  state = {
  };

  render() {
    return (
      <Segment basic={true}>
        <Header as="h1" icon={true} textAlign="center">
          <Icon color="teal" name="compass" circular={true} />
          <Header.Content>Dashboard</Header.Content>
        </Header>
      </Segment>
    );
  }
}
export default withRouter(Dashboard);
