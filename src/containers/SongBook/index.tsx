import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Header,
  Sticky,
  Segment,
  Icon,
  Button,
  Form,
  Card,
} from 'semantic-ui-react';
import Chord, { ChordProps, ActiveNote, ChordEditableFields } from '@/components/SongBook/Chord';

interface TimeSignature {
  quarters: number;
  measure: number;
}

interface Block { // cada seccion, con su nombre, compases y signature
  label: string;
  measures: Measure[];
  timeSignature: TimeSignature;
}

enum NoteDurations {
  Whole = 4 / 4, // 1
  Half = 2 / 4, // 0.5
  Quarter = 1 / 4, // 0.25
  Eigth = 1 / 8, // 0.125
  Sixteenth = 1 / 16, // 0.0625
}

interface Note {
  pitch: string;
  duration: NoteDurations; // como NoteDurations es un enum, que devuelve un numero, duration es un numero
}

interface Measure {
  notes: Note[];
  timeSignature?: TimeSignature; // el ? significa opcional, porque si no quiero especificarle un signature lo hereda del Block
}

interface Song {
  name: string;
  sections: Block[];
}

interface State { // el estado interno que va a manejar el componente
  song: Song;
  chords: ChordProps[];
}

interface Props {
  history: any; // la historia de navegacion del browser
}

class SongBook extends React.Component<Props, State> {
  contextRef: any;

  constructor(props: Props) {
    super(props);
    const chords: ChordProps[] = JSON.parse(localStorage.getItem('chords') || '[]') || [];
    const sections: Block[] = JSON.parse(localStorage.getItem('sections') || '[]') || [];
    this.state = {
      chords,
      song: {
        name: 'Tu Prima En Tanga',
        sections,
      },
    };
  }

  addChord = () => {
    this.setState(state => ({
      chords: [...state.chords, {
        strings: 6,
        frets: 5,
        name: '',
        isEditing: true,
      } as ChordProps]
    }), this.persistData);
  }

  deleteChord = (index: number) => {
    this.setState(state => {
      const chords = [...state.chords];
      chords.splice(index, 1);
      return {
        ...state,
        chords,
      };
    }, this.persistData);
  }

  onChangeChord = (index: number, data: ChordEditableFields) => {
    this.setState(state => {
      const chords = [...state.chords];
      chords.splice(index, 1, {
        ...chords[index],
        ...data,
        isEditing: false,
      });
      return {
        ...state,
        chords,
      };
    }, this.persistData);
  }

  addSong = () => {
    // TODO
  }

  addSectionToSong(e: any, data: any) {
    // TODO
  }

  persistData = () => {
    localStorage.setItem('chords', JSON.stringify(this.state.chords));
    localStorage.setItem('sections', JSON.stringify(this.state.song.sections));
  }

  render() {
    return (
      <Segment basic={true} ref={ref => { this.contextRef = ref; }}>
        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="music" circular={true} />
            SongBook
            <Header.Subheader>
              A place to write the songs n shit
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment attached="top">
          <Button.Group className="btnGroupResourceOptions">
            <Button onClick={this.addSong} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
            <Button onClick={this.addChord} circular={true}>
              <Icon name="add" />
              Agregar Acorde
            </Button>
          </Button.Group>
        </Segment>
        <Card.Group centered={true}>
          {
            this.state.chords.map((props: ChordProps, index) => {
              const onDelete = () => this.deleteChord(index);
              const onChange = (data: ChordEditableFields) => this.onChangeChord(index, data);
              return (
                <Chord
                  key={`chord_card_${props.name || ''}_${index}`}
                  onDelete={onDelete}
                  onChange={onChange}
                  {...props}
                />
              );
            })
          }
        </Card.Group>
        <Segment >
          <Form onSubmit={this.addSectionToSong}>
            <Form.Input
              type="text"
              name="label"
              label="Etiqueta"
            />
            <Form.Group inline={true}>
              <Form.Input
                type="number"
                name="quarters"
                label="Cuartos"
                value={4}
              />
              <Form.Input
                type="number"
                name="measure"
                label="Compas"
                value={4}
              />
            </Form.Group>
            <Form.Button
              type="submit"
              icon={true}
              circular={true}
            >
              <Icon name="save" />
            </Form.Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({ // funciones para mapear el estado de la aplicacion
});
const mapDispatchToProps = dispatch => ({ // funciones para mapear acciones de la aplicacion (dispatch an action to the application state)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongBook));
