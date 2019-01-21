import * as React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Chord from '../../../src/components/SongBook/Chord';

storiesOf('Chord', module)
  .add('Normal', () => {
    return (
      <Chord isEditing={false} />
    );
  })
  .add('Editing', () => {
    return (
      <Chord isEditing={true} />
    );
  });