import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import uuid from 'uuid/v4';

import {
  Header,
  Segment,
  Icon,
  Sticky,
  Button,
  Message,
} from 'semantic-ui-react';

interface EvaluationItem {
  id: string;
  trigger: string;
  appretiation: string;
  consequences: string;
  
}

interface Props {
  history: any;
}

interface State {
}

class Evaluation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }
  persistData() {
    localStorage.setItem('transactions', JSON.stringify({}));
  }

  render() {
    const {
    } = this.state;
    return (
      <Segment basic={true}>
        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="eye" circular={true} />
            Evaluación
          </Header.Content>
        </Header>
        <Message
          icon="quote left"
          header="Have you resolved your this issue to the degree that it is unlikely to occur again?"
          content="Jordan B. Peterson"
        />
        <Sticky>
          <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
            <Button onClick={() => null} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
          </Button.Group>
        </Sticky>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Evaluation));
