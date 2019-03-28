import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import styled from 'styled-components';

import { StepsState, setStep } from '../../ducks/steps';
import { Dispatch, bindActionCreators } from 'redux';

interface Props {
	hideOn: number;
	direction: 'forwards' | 'backwards';
	step: number;
	children: React.ReactNode;
	setStep(n: number): void;
}

interface State {
	steps: StepsState;
}

const StyledButton = styled(Button)`
	background: #444;

	&:hover {
		background: #555;
	}

	&:active {
		background: #555;
	}
`

function ControlButton({ hideOn, direction, step, setStep, children }: Props) {
	if (step === hideOn) {
		return null;
	}

	return (
		<StyledButton
			size="lg"
			onClick={() => setStep(direction === 'backwards' ? step - 1 : step + 1)}
		>
			{children}
		</StyledButton>
	);
}

const mapStateToProps = (state: State) => ({
	step: state.steps.step,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	setStep,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ControlButton);
