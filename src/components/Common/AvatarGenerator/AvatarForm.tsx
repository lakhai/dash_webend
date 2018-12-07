import * as React from 'react';
import { Form, DropdownItemProps } from 'semantic-ui-react';
import { AvatarStyle, Option, OptionContext } from 'avataaars';

interface SelectProps {
  options: DropdownItemProps[];
  controlId: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

class OptionSelect extends React.Component<SelectProps> {
  render() {
    const { controlId, label, value, options } = this.props;
    return (
      <Form.Group className="row" controlId={controlId}>
        <Form.Select
          value={value}
          label={label}
          options={options}
          onChange={this.onChange}
        />
      </Form.Group>
    );
  }

  private onChange = event => {
    if (this.props.onChange) {
      this.props.onChange(((event.target as any) as HTMLSelectElement).value);
    }
  }
}

export interface Props {
  avatarStyle: AvatarStyle;
  optionContext: OptionContext;
  displayingCode: boolean;
  displayingImg: boolean;
  onAvatarStyleChange?: (avatarStyle: AvatarStyle) => void;
  onChangeOption: (key: string, value: string) => void;
}

export default class AvatarForm extends React.Component<Props> {
  private onChangeCache: Array<(value: string) => void> = [];

  componentDidMount() {
    this.addListener();
  }

  addListener() {
    const { optionContext } = this.props;
    if (!optionContext) {
      return;
    }
    optionContext.addStateChangeListener(() => {
      this.forceUpdate();
    });
    this.onChangeCache = optionContext.options.map(option =>
      this.onChange.bind(this, option)
    );
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.optionContext !== this.props.optionContext;
  }

  render() {
    const { optionContext } = this.props;
    const selects = optionContext.options.map((option, index) => {
      const optionState = optionContext.getOptionState(option.key)!;
      if (optionState.available <= 0) {
        return null;
      }
      const selectOptions = optionState.options.map(type => ({
        value: type,
        text: type,
      }));
      const value = optionContext.getValue(option.key)!;
      return (
        <OptionSelect
          key={option.key}
          controlId={option.key}
          label={option.label}
          value={value}
          onChange={this.onChangeCache[index]}
          options={selectOptions}
        />
      );
    });
    return (
      <Form horizontal={true}>
        {selects}
      </Form>
    );
  }

  private onChange(option: Option, value: string) {
    const { optionContext } = this.props;
    optionContext.setValue(option.key, value);
  }

  private onAvatarStyleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (this.props.onAvatarStyleChange) {
      this.props.onAvatarStyleChange((event.target as any).value);
    }
  }
}
