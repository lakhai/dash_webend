import * as React from 'react';
import {
  Sidebar,
  Grid,
  Header,
  Icon,
  Menu,
  Button,
  Segment,
} from 'semantic-ui-react';

export interface Props {
  isOpen: boolean;
  logout: () => void;
}
class HorizontalSidebar extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.isOpen !== nextProps.isOpen;
  }

  render() {
    const { isOpen, logout } = this.props;
    return (
      <Sidebar
        as={Menu}
        visible={true}
        inverted={true}
        vertical={true}
        animation="push"
        direction="left"
        icon={isOpen ? 'labeled' : true}
        width={isOpen ? 'thin' : 'very thin'}
      >
        <Menu.Item name="home" href="/dashboard">
          <Icon size="small" name="home" />
          {isOpen && 'Home'}
        </Menu.Item>
        <Menu.Item name="quests" href="/dashboard/quests">
          <Icon size="small" name="trophy" />
          {isOpen && 'Quests'}
        </Menu.Item>
        <Menu.Item name="goals" href="/dashboard/goals">
          <Icon size="small" name="list ul" />
          {isOpen && 'Goals'}
        </Menu.Item>
        <Menu.Item name="journal" href="/dashboard/journal">
          <Icon size="small" name="book" />
          {isOpen && 'Journal'}
        </Menu.Item>
        <Menu.Item name="logout" onClick={() => logout()}>
          <Icon size="small" name="log out" />
          {isOpen && 'Log Out'}
        </Menu.Item>
      </Sidebar>
    );
  }
}
export default HorizontalSidebar;
