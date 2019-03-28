import * as React from 'react';
import { connect } from 'react-redux';
import { Progress as ProgressBar } from 'reactstrap';

import { StepsState } from '../../ducks/steps';

interface Props {
	step: number;
}

interface State {
	steps: StepsState;
}

function Progress({ step }: Props) {
	return (
    <>
      <ProgressBar
				value={step * 100 / 3}
				className="mb-2"
			/>
      <div className="h5 mb-5 font-weight-light">{step} / 3</div>
    </>
	);
}

const mapStateToProps = (state: State) => ({
	step: state.steps.step,
});

export default connect(mapStateToProps)(Progress);
