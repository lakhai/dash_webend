import * as React from 'react';
import { debounce, includes } from 'lodash';
import { connect } from 'react-redux';
import {
  Search, Header, Icon,
} from 'semantic-ui-react';
import {
  QuestsActions,
} from 'src/redux/actions';
import { Quest } from 'src/models';

export interface QuestPickerProps {
  isLoading: boolean;
  quests: Quest[];
  value: string;
  getQuests: () => void;
  onChange: (value: string) => void;
  onSelect: (quest: Quest) => void;
}

class QuestPicker extends React.Component<QuestPickerProps, {}> {
  componentDidMount() {
    this.fetchQuests();
  }

  shouldComponentUpdate(nextProps: QuestPickerProps) {
    const {
      isLoading: nextIsLoading, quests: nextQuests, value: nextValue,
    } = nextProps;
    const {
      isLoading, quests, value,
    } = this.props;
    return (
      nextIsLoading !== isLoading ||
      nextQuests !== quests ||
      nextValue !== value
    );
  }

  get results() {
    const {
      value,
      quests,
    } = this.props;
    const list = value.length
      ? quests.filter(itm => includes(itm.name, value))
      : quests;
    return list.map(itm => ({
      id: itm.id,
      title: itm.name,
    }));
  }

  fetchQuests = () => this.props.getQuests();

  onChange = (e, props) => this.props.onChange(props.value);

  handleResultSelect = (e, props) => {
    if (!props.result.id) {
      return;
    }
    const quest = this.props.quests.find(itm => itm.id === props.result.id);
    if (quest) {
      this.props.onSelect(quest);
    }
  }

  renderQuest = ({ title }) => <Header as="h5"><Icon name="trophy" size="small" />{title}</Header>;

  render() {
    const {
      value,
      isLoading,
    } = this.props;
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        value={value}
        onSearchChange={debounce(this.onChange, 500, { leading: true })}
        results={this.results}
        resultRenderer={this.renderQuest}
        defaultOpen={true}
      />
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getQuests: () => dispatch(QuestsActions.getQuests()),
});
const mapStateToProps = state => ({
  isLoading: state.quests.isLoading,
  quests: state.quests.quests,
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestPicker);