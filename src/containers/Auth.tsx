import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
  HeaderContent,
  InputOnChangeData,
  Container,
} from 'semantic-ui-react';

import { api } from '../constants';

export interface Props {
  getToken: Function;
  logOut: Function;
  isLoggedIn: boolean;
  history: any;
}
export interface State {
  isLoading: boolean;
  email: string;
  password: string;
  activeTab: string;
  isRegistering: boolean;
  firstName: string;
  lastName: string;
}

// interface PostResponse {
//   accessToken: string;
//   expiresIn: string;
// }

class Auth extends React.Component<Props, State> {
  public state: State = {
    activeTab: '',
    email: 'salines.sebastian@gmail.com',
    isLoading: false,
    password: 'string',
    isRegistering: false,
    firstName: '',
    lastName: '',
  };

  get headerText() {
    return this.state.isRegistering ? (
      <React.Fragment>
        <Button icon={true} onClick={this.showLoginForm} circular={true} color="teal">
          <Icon name="arrow left"/>
        </Button>
        <span>Register a new account</span>
      </React.Fragment>
    ) : 'Log-in to your account';
  }

  public onSubmit = () => {
    const {
      email,
      password,
      isRegistering,
      firstName,
      lastName,
    } = this.state;
    if (isRegistering) {
      this.setState({ isLoading: true }, () => {
        axios.post(`${api.url}/auth/register`, {
          email,
          password,
          firstName,
          lastName,
        })
          .then(({ accessToken }: any) => {
            localStorage.setItem('accessToken', accessToken);
            this.setState({ isLoading: false, isRegistering: false });
          })
          .catch(err => {
            this.setState({ isLoading: false });
          });
      });
    } else {
      this.setState({ isLoading: true }, () => {
        axios.post(`${api.url}/auth/login`, {
          email, password,
        })
          .then(({ accessToken }: any) => {
            localStorage.setItem('accessToken', accessToken);
            this.setState({ isLoading: false }, () => this.props.history.push('/'));
          })
          .catch(err => {
            this.setState({ isLoading: false });
          });
      });
    }
  }

  public onChangeEmail = (e: any, { value: email }: InputOnChangeData) => this.setState({ email });

  public onChangePassword = (e: any, { value: password }: InputOnChangeData) => this.setState({ password });

  public onChangeFirstName = (e: any, { value: firstName }: InputOnChangeData) => this.setState({ firstName });

  public onChangeLastName = (e: any, { value: lastName }: InputOnChangeData) => this.setState({ lastName });

  public showRegisterForm = () => this.setState({ isRegistering: true });

  public showLoginForm = () => this.setState({ isRegistering: false });

  public renderCurrentForm = () => {
    const {
      email,
      password,
      isLoading,
      firstName,
      lastName,
      isRegistering,
    } = this.state;
    if (isRegistering) {
      return (
        <Form loading={isLoading} onSubmit={this.onSubmit} size="large">
          <Segment stacked={true}>
            <Form.Input
              fluid={true}
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={this.onChangeEmail}
            />
            <Form.Input
              fluid={true}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <Form.Input
              fluid={true}
              placeholder="First Name"
              value={firstName}
              onChange={this.onChangeFirstName}
            />
            <Form.Input
              fluid={true}
              placeholder="Last Name"
              value={lastName}
              onChange={this.onChangeLastName}
            />
            <Button color="teal" fluid={true} size="large">Register</Button>
          </Segment>
        </Form>
      );
    }
    return (
      <Form loading={isLoading} onSubmit={this.onSubmit} size="large">
        <Segment stacked={true}>
          <Form.Input
            fluid={true}
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            value={email}
            onChange={this.onChangeEmail}
          />
          <Form.Input
            fluid={true}
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            value={password}
            onChange={this.onChangePassword}
          />
          <Button color="teal" fluid={true} size="large">Login</Button>
        </Segment>
      </Form>
    );
  }

  public render() {

    return (
      <Container fluid={true} className="login-form">
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body div#root div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Icon name="compass" color="teal" size="massive" />
            <Header as="h1" color="teal" textAlign="center">
              <HeaderContent>
                {this.headerText}
              </HeaderContent>
            </Header>
            {
              this.renderCurrentForm()
            }
            {
              !this.state.isRegistering &&
              <Message>
                New to us? <a href="#" onClick={this.showRegisterForm}>Sign Up</a>
              </Message>
            }
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
export default withRouter(Auth);
