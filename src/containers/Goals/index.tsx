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
  Button,
  Card,
} from 'semantic-ui-react';
import { Goal } from 'src/models';
import { GoalsActions } from 'src/redux/actions';
import { GoalsReducer } from 'src/redux/reducers/goals';
import { bindActionCreators } from 'redux';

interface Props {
  history: any;
  goalsState: GoalsReducer;
  actions: any;
}
interface State {
  goals: Goal[];
}

class Goals extends React.Component<Props, State> {
  componentDidMount() {
    this.props.actions.getGoals();
  }

  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.goalsState.isLoading !== this.props.goalsState.isLoading ||
      nextProps.goalsState.goals.length !== this.props.goalsState.goals.length
    );
  }

  render() {
    const { isLoading, goals } = this.props.goalsState;
    return (
      <Segment loading={isLoading} basic={true}>
        <Header as="h1" icon={true} textAlign="center">
          <Icon color="teal" name="arrow alternate circle up" circular={true} />
          <Header.Content>Goals</Header.Content>
        </Header>
        <Card.Group centered={true}>
          {
            goals.map(goal => {
              return (
                <Card key={`card_${goal.id}`}>
                  <Card.Content>
                    <Card.Header >
                      <Icon name="hourglass start" circular={true} />
                      {goal.title}
                    </Card.Header>
                    <Card.Meta>{`Awards: ${goal.awards} XP`}</Card.Meta>
                    <Card.Description>{goal.description}</Card.Description>
                  </Card.Content>
                  <Card.Content>
                    <div className="ui two buttons">
                      <Button basic={true} color="green">Approve</Button>
                      <Button basic={true} color="red">Decline</Button>
                    </div>
                  </Card.Content>
                </Card>
              );
            })
          }
        </Card.Group>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
  goalsState: state.goals,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...GoalsActions }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Goals));
