import * as React from 'react';
import { get, cloneDeep } from 'lodash';
import {
  Modal,
  Button,
  Icon,
  Header,
  Form,
} from 'semantic-ui-react';
import { UpdateGoalDto, CreateGoalDto, Goal } from 'src/models';

export interface State extends CreateGoalDto {

}

export interface Props {
  selectedGoal?: Goal | null;
  isOpen: boolean;
  isLoading: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onSubmit: (goal: CreateGoalDto | UpdateGoalDto) => void;
}

class CreateGoalModal extends React.Component<Props, State> {
  state = {
    title: '',
    description: '',
    awards: 0,
  };

  form: any = null;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedGoal) {
      if (nextProps.selectedGoal.id !== get(this.props, 'selectedGoal.id', null)) {
        return this.setState({
          title: nextProps.selectedGoal.title,
          awards: nextProps.selectedGoal.awards,
          description: nextProps.selectedGoal.description,
        });
      }
    } else if (this.props.selectedGoal || !nextProps.selectedGoal) {
      this.setState({
        title: '',
        awards: 0,
        description: '',
      });
    }
  }

  get title() {
    return this.props.selectedGoal
      ? this.props.selectedGoal.title : 'Add Goal';
  }

  onChangeForm = e => {
    const { name, value } = get(e, 'target', {});
    this.setState(prevState => {
      const state = cloneDeep(prevState);
      switch (name) {
        case 'title':
          state.title = value;
          break;
        case 'description':
          state.description = value;
          break;
        case 'awards':
          state.awards = +value;
          break;
        default:
          break;
      }
      return state;
    });
  }

  onSubmit = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    const {
      title,
      description,
      awards,
    } = this.state;
    return (
      <Modal
        closeIcon={true}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        size="small"
      >
        <Header icon="checkmark" content={this.title} />
        <Modal.Content>
          <Form
            ref={ref => { this.form = ref; }}
            onSubmit={this.onSubmit}
            loading={this.props.isLoading}
          >
            <Form.Field>
              <Form.Input
                type="text"
                name="title"
                label="Title"
                onChange={this.onChangeForm}
                required={true}
                value={title}
                placeholder="Goal Title"
              />
              <Form.Input
                type="number"
                name="awards"
                required={true}
                onChange={this.onChangeForm}
                label="Awards"
                value={awards}
                placeholder="How much XP will goal award on completion"
              />
              <Form.TextArea
                name="description"
                onChange={this.onChangeForm}
                required={true}
                label="Description"
                value={description}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose}>Cancel</Button>
          <Button color="green" onClick={this.onSubmit}><Icon name="checkmark" /> Save</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default CreateGoalModal;