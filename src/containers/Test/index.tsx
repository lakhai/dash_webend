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
import SongBook from '../SongBook';

interface Props {
}

interface State {
  texto: string;
}

class TestContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      texto: '',
    };
  }

  concha = () => {
    this.setState({ texto: 'concha' });
  }

  render() {
    const {
    } = this.state;
    return (
      <Container>
        <h1>{this.state.texto}</h1>
        <Button
          onClick={this.concha}
          label="hacer cosas"
        />
      </Container>
    );
  }
}
export default TestContainer;
