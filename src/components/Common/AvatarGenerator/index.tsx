import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Avatar, AvatarStyle, OptionContext, allOptions } from 'avataaars';
import { fromPairs, sample } from 'lodash';

import AvatarForm from './AvatarForm';
import { Button, Icon } from 'semantic-ui-react';

interface Props {
  __render__?: string;
  avatarStyle: AvatarStyle;
  onChangeAvatarStyle: (avatarStyle: AvatarStyle) => void;
}
interface State {
  displayComponentCode: boolean;
  displayComponentImg: boolean;
}

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export class AvatarGenerator extends React.Component<Props, State> {
  static childContextTypes = {
    optionContext: PropTypes.instanceOf(OptionContext),
  };
  static defaultProps = {
    avatarStyle: AvatarStyle.Circle
  };

  state = {
    displayComponentCode: false,
    displayComponentImg: false
  };

  private optionContext: OptionContext = new OptionContext(allOptions);

  getChildContext() {
    return { optionContext: this.optionContext };
  }

  componentDidMount() {
    if (typeof this.optionContext === typeof OptionContext) {
      this.optionContext.addValueChangeListener(this.onOptionValueChange);
    }
    const anyWindow = window as any;
    setTimeout(() => {
      anyWindow.prerenderReady = true;
    }, 500);
  }

  componentWillUnmount() {
    if (this.optionContext) {
      this.optionContext.removeValueChangeListener(this.onOptionValueChange);
    }
  }

  render() {
    const { avatarStyle } = this.props;
    const { displayComponentCode, displayComponentImg } = this.state;
    const title = 'Avataaars Generator - Generate your own avataaars!';
    return (
      <main role="main">
        <header className="header clearfix">
          <h2 style={{ color: '#6A39D7' }}>
            avataaars generator
            <Button
              icon={true}
              onClick={this.onRandom}
              style={{ marginLeft: '1rem' }}
            >
              <Icon name="random" /> Random
            </Button>
          </h2>
        </header>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Avatar avatarStyle={avatarStyle} />
        </div>
        <AvatarForm
          optionContext={this.optionContext}
          avatarStyle={avatarStyle}
          displayingCode={displayComponentCode}
          displayingImg={displayComponentImg}
          onAvatarStyleChange={this.onAvatarStyleChange}
          onChangeOption={this.onChangeOption}
        />
      </main>
    );
  }
  private onChangeOption = (key, value) => {
    this.optionContext.setValue(key, value);
  }

  private onOptionValueChange = (key: string, value: string) => {
    const name = capitalizeFirstLetter(key);
    const handlerName = `onChange${name}`;
    const updateHandler = this.props[handlerName] as (value: string) => void;
    updateHandler(value);
  }

  private updateOptionContext(nextProps: Props) {
    this.optionContext.setData(nextProps as any);
  }

  private onAvatarStyleChange = (avatarStyle: AvatarStyle) => {
    this.props.onChangeAvatarStyle(avatarStyle);
  }

  private onRandom = () => {
    const { optionContext } = this;
    let values: { [index: string]: string } = {
      avatarStyle: this.props.avatarStyle
    };

    for (const option of optionContext.options) {
      if (option.key in values) {
        continue;
      }
      const optionState = optionContext.getOptionState(option.key)!;
      // Notice, when the app just launch and we didn't explore too much
      // options, some of these nested option is not added by the selector
      // yet, so we won't be able to select value for them. But as they
      // keep tapping random button, soon or later we will get all the
      // options. So it should be fine. Ideally we should find a better
      // way to collect all the options, but that's okay to just do it this
      // way for now.
      if (!optionState.options.length) {
        continue;
      }
      values[option.key] = sample(optionState.options)!;
    }
    this.optionContext.setData(values);
  }
}

export default AvatarGenerator;
