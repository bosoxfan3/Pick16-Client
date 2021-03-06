import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import UserNav from './user-nav';
import LeaderboardMain from './leaderboard-main';

import { getUser, getAllUsers, updateScores } from '../../actions/users';
import { fetchMatchupData } from '../../actions/matchups';

export class LeaderboardPage extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(getAllUsers());
    this.props.dispatch(getUser());
    this.props.dispatch(fetchMatchupData());
  }
  updateScores() {
    this.props.dispatch(updateScores());
  }
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <UserNav />
        <LeaderboardMain updateScores={() => this.updateScores()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LeaderboardPage);