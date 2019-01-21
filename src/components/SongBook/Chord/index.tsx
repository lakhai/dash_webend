import * as React from 'react';
import { css } from 'aphrodite';
import { times, some } from 'lodash';
import MIDISounds from 'midi-sounds-react';
import {
  Grid, StrictGridProps, Header, Card, Sticky, Button, Input,
} from 'semantic-ui-react';

import './style.css';

const ChordCell = (props: {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  isActive: boolean,
}) => {
  const className = props.isActive ? 'cellState active' : 'cellState';
  return (
    <div className="chordCell">
      <div onClick={props.onClick} className={className} />
    </div>
  );
};

const OpenStringCell = (props: {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  isMuted: boolean,
  isActive: boolean
}) => {
  const className = props.isActive ? 'cellState active' : 'cellState';
  return (
    <div className="chordCell">
      <div onClick={props.onClick} className={className} />
    </div>
  );
};

export interface ChordProps {
  name?: string;
  isEditing?: boolean;
  strings?: number;
  frets?: number;
  activeNotes?: ActiveNote[];
}

interface ActiveNote {
  string: number;
  fret: number;
}

export interface ChordState {
  isMidiReady: boolean;
  midiRef: any;
  isEditing: boolean;
  chordName: string;
  stickyContext?: any;
  activeNotes: ActiveNote[];
}

export interface PureChordProps {
  canEdit: boolean;
  activeNotes: ActiveNote[];
  strings: number;
  frets: number;
  onClickCell: (e: React.MouseEvent<HTMLDivElement>, cell: ActiveNote) => void;
}

const stringNotes = {
  6: [
    'F',
    'Gb',
    'G',
    'Ab',
    'A',
    'Bb',
    'B',
  ],
  5: [
    'Bb',
    'B',
    'C',
    'Db',
    'D',
    'Eb',
    'E',
  ],
};

const getNote = (note: ActiveNote): string => {
  const { string: stringNumber, fret } = note;
  const selectedString = stringNotes[stringNumber] || null;
  return selectedString ? selectedString[fret] : '';
};

class PureChord extends React.PureComponent<PureChordProps> {
  render() {
    const { activeNotes, strings = 6, frets = 5 } = this.props;
    return (
      <div>
        <Grid centered={true}>
          {
            times(strings, stringNumber => (
              <Grid.Row className="chordString">
                {
                  times(frets, fret => {
                    const isNoteActive = activeNotes.find(itm => itm.fret === fret && itm.string === stringNumber);
                    const note = {
                      fret,
                      string: stringNumber,
                    } as ActiveNote;
                    const onClick = this.props.canEdit
                      ? e => this.props.onClickCell(e, note) : () => null;
                    return (
                      <Grid.Column className="chordFret">
                        <ChordCell
                          onClick={onClick}
                          isActive={!!isNoteActive}
                        />
                      </Grid.Column>
                    );
                  })
                }
              </Grid.Row>
            ))
          }
        </Grid>
      </div>
    );
  }
}

class Chord extends React.Component<ChordProps, ChordState> {
  constructor(props: ChordProps) {
    super(props);
    const name = props.name || '';
    const activeNotes = props.activeNotes || [];
    const isEditing = props.isEditing || false;
    this.state = {
      isMidiReady: false,
      midiRef: null,
      isEditing: false,
      chordName: name,
      activeNotes,
    };
  }

  handleContextRef = ref => this.setState({ stickyContext: ref });

  onChangeChordName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ chordName: e.target.value });

  toggleEdit = () => this.setState(({ isEditing }) => ({ isEditing: !isEditing }));

  toggleCell = (event: React.MouseEvent<HTMLDivElement>, note: ActiveNote) => {
    this.setState(state => {
      const existingIndex = state.activeNotes.findIndex(itm => itm.string === note.string && itm.fret === note.fret);
      if (existingIndex >= 0) {
        const activeNotes = [...state.activeNotes];
        activeNotes.splice(existingIndex, 1);
        return {
          ...state,
          activeNotes,
        };
      }
      if (this.state.midiRef && this.state.isMidiReady) {
        this.state.midiRef.playChordNow(262, [65], 2.5);
      }
      return {
        ...state,
        activeNotes: [...state.activeNotes.filter(itm => itm.string !== note.string), note],
      };
    });
  }

  midiRef = ref => this.setState({ midiRef: ref, isMidiReady: true });

  render() {
    const { activeNotes, chordName, isEditing, stickyContext } = this.state;
    const { strings = 6, frets = 5 } = this.props;
    return (
      <Card ref={this.handleContextRef}>
        <Button circular={true} onClick={this.toggleEdit} icon="edit" />
        {
          isEditing
            ? (
              <Input type="text" value={chordName} onChange={this.onChangeChordName} />
            ) : (
              <Header as="h5">{chordName}</Header>
            )
        }
        <PureChord
          frets={frets}
          strings={strings}
          canEdit={isEditing}
          activeNotes={activeNotes}
          onClickCell={this.toggleCell}
        />
        <MIDISounds
          ref={this.midiRef}
          appElementName="root"
          instruments={[262]}
        />
      </Card>
    );
  }
}
export default Chord;