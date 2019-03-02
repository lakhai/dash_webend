import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  mainContainer: {
    padding: '10px',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: '10px auto',
    justifyContent: 'center',
    transform: 'rotate(90deg)',
  },
  string: {
    height: '20px',
    flex: 1,
    display: 'flex',
    // ':last-child': {
    //   borderBottom: '2px solid black',
    // },
  },
  fret: {
    borderLeft: '2px solid black',
    borderTop: '2px solid black',
    position: 'relative',
    width: '40px',
    ':last-child': {
      borderRight: '2px solid black',
    },
  },
  cell: {
    width: '12px',
    height: '12px',
    position: 'absolute',
    borderRadius: '6px',
    background: 'transparent',
    cursor: 'pointer',
    top: '-6px',
    left: 'calc(50% - 6px)',
  },
  lastFret: {
    borderRight: '1px solid transparent !important',
    borderLeft: 'none',
  },
  cellActive: {
    background: 'red',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameInput: {
    flex: '1',
  },
  name: {
    flex: '1',
    padding: '.67857143em 1em',
    lineHeight: '1.21428571em',
    border: '1px solid transparent',
    margin: '0',
    fontWeight: 'normal',
  },
  actions: {
    margin: '0 5px',
  },
});
export default styles;
