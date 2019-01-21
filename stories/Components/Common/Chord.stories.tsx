import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Chord from '../../../src/components/SongBook/Chord';

storiesOf('Chord', module)
  .add('Empty', () => {
    return (
      <Chord />
    );
  });