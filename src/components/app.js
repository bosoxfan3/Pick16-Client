import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LandingPage from './landing-page/landing-page';
import LeaderboardPage from './pickem/leaderboard-page';
import MyPicksPage from './pickem/my-picks-page';
import PublicPicksPage from './pickem/public-picks-page';

import { refreshAuthToken } from '../actions/auth';

export class App extends React.Component {
  componentDidMount() {
    if (this.props.hasAuthToken) {
      this.props.dispatch(refreshAuthToken());
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 //one hour
    );
  }
  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }
  render() {
    return (
      <div>
        <main>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/leaderboard' component={LeaderboardPage} />
          <Route exact path='/my-picks' component={MyPicksPage} />
          <Route exact path='/public-picks' component={PublicPicksPage} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));