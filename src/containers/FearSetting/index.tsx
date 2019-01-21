import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import uuid from 'uuid/v4';
import { Transaction } from '@/models';

import {
  Header,
  Segment,
  Icon,
  Sticky,
  Button,
  Card,
  Feed,
  Message,
} from 'semantic-ui-react';
import MoneyTransactionModal from '@/modals/MoneyTransactionModal';
import StepModal from '@/components/Common/StepModal';

interface Props {
  history: any;
}

interface State {
  money: number;
  transactions: Transaction[];
  isModalOpen: boolean;
  selectedTransaction: Transaction | null;
}

interface CurrentEconomy {
  money: number;
}

class FearSetting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const money = Number(localStorage.getItem('money')) || 0;
    const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]') || [];
    this.state = {
      money,
      transactions: transactions.map(itm => ({
        ...itm,
        date: moment(itm.date),
      })),
      isModalOpen: true,
      selectedTransaction: null,
    };
  }

  get money() {
    return this.getTotalMoney(this.state.transactions, 0);
  }

  getTotalMoney(transactions: Transaction[], base: number = 0): number {
    return transactions.reduce((money, trans) => {
      const isNeg = +trans.amount < 0;
      return money + +trans.amount;
    }, base);
  }

  showModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  handleSubmit = (data: { id?: string, description: string, amount: number }) => {
    this.setState(state => {
      const {
        id, description, amount,
      } = data;
      if (id && state.transactions.find(itm => itm.id === id)) {
        const transactions = state.transactions.map(itm => itm.id === id ? {
          ...itm,
          amount: +amount,
          description,
        } : itm);
        const money = this.getTotalMoney(transactions, 0);
        return {
          ...state,
          money,
          transactions,
          isModalOpen: false,
        };
      }
      const transaction: Transaction = {
        id: uuid(),
        description,
        amount: +amount,
        date: moment(),
      };
      return {
        ...state,
        isModalOpen: false,
        money: this.getTotalMoney([...state.transactions, transaction], 0),
        transactions: [...state.transactions, transaction],
      };
    }, this.persistData);
  }

  deleteTransaction = id => {
    const transactions = this.state.transactions;
    const index = transactions.findIndex(itm => itm.id === id);
    if (index >= 0) {
      transactions.splice(index, 1);
      this.setState(state => ({
        ...state,
        money: this.getTotalMoney(transactions, 0),
        transactions,
      }), this.persistData);
    }
  }

  persistData() {
    localStorage.setItem('money', JSON.stringify(this.state.money));
    localStorage.setItem('transactions', JSON.stringify(this.state.transactions));
  }

  render() {
    const {
      isModalOpen,
      transactions,
    } = this.state;
    return (
      <Segment basic={true}>
        <StepModal
          isOpen={isModalOpen}
          onFinished={this.closeModal}
          handleOpen={this.showModal}
          handleClose={this.closeModal}
        />
        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="heartbeat" circular={true} />
            Fear Setting
          </Header.Content>
          <Header.Subheader>
            Fear setting for stuff
          </Header.Subheader>
        </Header>
        <Sticky>
          <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
            <Button onClick={this.showModal} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
          </Button.Group>
        </Sticky>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FearSetting));
