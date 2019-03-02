import * as React from 'react';
import { css } from 'aphrodite/no-important';
import { times, some } from 'lodash';
import MIDISounds from 'midi-sounds-react';
import {
  Header, Card, Button, Input,
} from 'semantic-ui-react';

import styles from './styles';

const ChordCell = (props: {
  style?: any,
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  isActive: boolean,
}) => {
  const className = css(
    styles.cell,
    props.isActive && styles.cellActive,
  );
  return (
    <div className={css(styles.fret, !!props.style && props.style)}>
      <div onClick={props.onClick} className={className} />
    </div>
  );
};

export interface ChordProps {
  name?: string;
  isEditing?: boolean;
  strings?: number;
  frets?: number;
  onDelete: () => void;
  onChange: (props: ChordEditableFields) => void;
  activeNotes?: ActiveNote[];
}

export interface ChordEditableFields {
  name?: string;
  activeNotes?: ActiveNote[];
}

export interface ActiveNote {
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
  firstFret: number;
  onClickCell: (e: React.MouseEvent<HTMLDivElement>, cell: ActiveNote) => void;
}

const stringNotes = {
};

const getNote = (note: ActiveNote): string => {
  const { string: stringNumber, fret } = note;
  const selectedString = stringNotes[stringNumber] || null;
  return selectedString ? selectedString[fret] : '';
};

export class PureChord extends React.PureComponent<PureChordProps> {
  render() {
    const { activeNotes, strings = 6, frets = 5 } = this.props;
    return (
      <div className={css(styles.container)}>
        {
          times(strings, stringNumber => (
            <div className={css(styles.string)}>
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
                    <ChordCell
                      style={strings === (stringNumber + 1) && styles.lastFret}
                      onClick={onClick}
                      isActive={!!isNoteActive}
                    />
                  );
                })
              }
            </div>
          ))
        }
      </div>
    );
  }
}

class Chord extends React.Component<ChordProps, ChordState> {
  constructor(props: ChordProps) {
    super(props);
    const name = props.name || '';
    const activeNotes = props.activeNotes || [];
    this.state = {
      isEditing: props.isEditing || false,
      activeNotes,
      midiRef: null,
      chordName: name,
      isMidiReady: false,
    };
  }

  handleContextRef = ref => this.setState({ stickyContext: ref });

  onChange = () => {
    this.props.onChange({
      name: this.state.chordName,
      activeNotes: this.state.activeNotes,
    });
  }

  onChangeChordName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ chordName: e.target.value });

  delete = () => this.props.onDelete();

  toggleEdit = () => this.setState(state => {
    if (state.isEditing) {
      this.props.onChange({
        name: state.chordName,
        activeNotes: state.activeNotes,
      });
    }
    return {
      ...state,
      isEditing: !state.isEditing,
    };
  })

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

  renderActions = () => {
    return (
      <div className={css(styles.actions)}>
        <Button
          icon={this.state.isEditing ? 'save' : 'edit'}
          circular={true}
          onClick={this.toggleEdit}
        />
        <Button
          icon="delete"
          circular={true}
          onClick={this.delete}
        />
      </div>
    );
  }

  render() {
    const { activeNotes, chordName, isEditing, stickyContext } = this.state;
    const { strings = 6, frets = 5 } = this.props;
    return (
      <Card className={css(styles.mainContainer)} ref={this.handleContextRef}>
        <div className={css(styles.nameContainer)}>
          {
            isEditing
              ? (
                <Input type="text" className={css(styles.nameInput)} value={chordName} onChange={this.onChangeChordName} />
              ) : (
                <Header className={css(styles.name)} as="h5">{chordName}</Header>
              )
          }
          {
            this.renderActions()
          }
        </div>
        <PureChord
          frets={frets}
          strings={strings}
          firstFret={0}
          canEdit={isEditing}
          activeNotes={activeNotes}
          onClickCell={this.toggleCell}
        />
      </Card>
    );
  }
}
export default Chord;