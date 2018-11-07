import * as React from 'react';
import {
  Menu, Icon, Button,
} from 'semantic-ui-react';

export interface Props {
  toggleSidebar: Function;
}

class TopNavigation extends React.Component<Props, {}> {
  render() {
    return (
      <Menu inverted={true} stackable={true} fluid={true} style={{ borderRadius: '0', marginBottom: '0' }}>
        <Menu.Item>
          <Button circular={true} onClick={() => this.props.toggleSidebar()} icon={true} color="teal" >
            <Icon name="compass outline" size="big" />
          </Button>
        </Menu.Item>
        <Menu.Item name="home">Home</Menu.Item>
        <Menu.Item name="Thing">Thing</Menu.Item>
      </Menu>
    );
  }
}
export default TopNavigation;
