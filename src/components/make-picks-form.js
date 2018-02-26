import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Select from './select';
import { required } from '../validators';
import { makePicks } from '../actions/picks';

export class MakePicksForm extends React.Component {
  onSubmit(values) {
    this.props.dispatch(makePicks(values));
    this.props.history.push('/leaderboard');
  }
  render() {
    const matchups = this.props.matchupData.map((matchup, index) => {
      return (
        <Field
          component={Select}
          name={`matchup${index}`}
          key={`matchup${index}`}
          options={[matchup[0], matchup[1]]}
          validate={required}
        />
      )
    });
    return (
      <form
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
        )}>
        {matchups}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    matchupData: state.matchups.matchups,
    user: state.auth.user
  }
};

MakePicksForm = connect(mapStateToProps)(MakePicksForm);
MakePicksForm = reduxForm({
  form: 'make-picks'
})(MakePicksForm);

export default MakePicksForm;