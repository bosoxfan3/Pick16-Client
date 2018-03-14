import React from 'react';
import { connect } from 'react-redux';

import './leaderboard-main.css';

export class LeaderboardMain extends React.Component {
  render() {
    if (!this.props.allUsers) {
      return <div></div>;
    }
    const titles = (
      <div className="titles">
        <div className="col-1">
          <h2>Rank</h2>
        </div>
        <div className="entry-name col-4">
          <h2>Entry Name</h2>
        </div>
        <div className="username col-4">
          <h2>Username</h2>
        </div>
        <div className="col-3">
          <h2>Points</h2>
        </div>
      </div>
    );
    const rankings = this.props.allUsers.map((user, index) => {
      return (
        <div className="rankings" key={index}>
          <div className="rank col-1">
            <h3>{index+1}</h3>
          </div>
          <div className="entry col-4">
            <h3>{user.name}</h3>
          </div>
          <div className="user col-4">
            <h3>{user.username}</h3>
          </div>
          <div className="col-3">
            <h3>{user.points}</h3>
          </div>
        </div>
      )
    });
    return (
      <div id="leaderboard-main">
        <div className="row">
          <div className="leaderboard-area col-12">
            <h1>Leaderboard</h1>
            {titles}
            {rankings}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allUsers: state.users.allUsers
});

export default connect(mapStateToProps)(LeaderboardMain);