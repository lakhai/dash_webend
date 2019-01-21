import * as React from 'react';
import {
  Header,
  Segment,
  Icon,
  Sticky,
  Button,
  Card,
  Feed,
  Message,
  Container,
} from 'semantic-ui-react';
import Chord from '@/components/SongBook/Chord';

interface Props {
}

interface State {
}

class TestContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
    } = this.state;
    return (
      <Container>
        <Header
          as="h1"
          textAlign="left"
          content="Testing the shits"
        />
        <Chord
          isEditing={true}
        />
      </Container>
    );
  }
}
export default TestContainer;
