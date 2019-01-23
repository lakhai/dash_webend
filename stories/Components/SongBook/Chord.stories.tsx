import * as React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import Chord from '../../../src/components/SongBook/Chord';
import { Header, Progress } from 'semantic-ui-react';

storiesOf('Chord', module)
  .add('Normal', () => {
    return (
      <Progress percent={20} />
    );
  });