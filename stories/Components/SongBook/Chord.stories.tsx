import * as React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';

import Chord from '../../../src/components/SongBook/Chord';

storiesOf('Chord', module)
  .add('Normal', () => {
    return (
      <div style={{ padding: '50px' }}>
        <Chord
          onChange={data => null}
          onDelete={() => null}
          frets={3}
          name="Cmaj7"
        />
      </div>
    );
  });