import * as React from 'react';
import {
  Button,
  Header,
  Modal,
  ModalProps,
  Icon,
} from 'semantic-ui-react';

export interface StepModalState {
  currentStep: number;
  steps: any[];
}

export interface StepModalProps extends ModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onFinished?: () => void;
}

class StepModal extends React.Component<StepModalProps, StepModalState> {
  state = {
    currentStep: 0,
    steps: ['first', 'second', 'stfucc'],
  };

  get prevStepButtonText() {
    const { currentStep } = this.state;
    return currentStep === 0 ? 'Cancelar' : 'Atras';
  }

  get nextButtonText() {
    const { currentStep, steps } = this.state;
    return currentStep === steps.length - 1
      ? (
        <React.Fragment>
          <Icon name="check" />
          Guardar
      </React.Fragment>
      ) : (
        <React.Fragment>
          <Icon name="arrow alternate circle right" />
          Siguiente
      </React.Fragment>
      );
  }

  nextStep = () => {
    const { steps, currentStep } = this.state;
    if (currentStep === steps.length - 1) {
      if (this.props.onFinished) {
        this.props.onFinished();
      }
      this.setState({ currentStep: 0 });
      return;
    }
    this.setState({ currentStep: currentStep + 1 });
  }

  prevStep = () => {
    const { steps, currentStep } = this.state;
    if (currentStep === 0) {
      this.props.handleClose();
      return;
    }
    this.setState({ currentStep: currentStep - 1 || 0 });
  }

  render() {
    return (
      <Modal
        closeIcon={true}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        size="small"
      >
        <Header icon="trophy" content={this.state.steps[this.state.currentStep]} />
        <Modal.Content>
          {this.props.children}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.prevStep}>{this.prevStepButtonText}</Button>
          <Button color="green" onClick={this.nextStep}>{this.nextButtonText}</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default StepModal;