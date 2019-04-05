import * as React from 'react';
import { connect } from 'react-redux';
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

const Button = styled.button`
	padding: 0.5rem 1rem;
	display: inline-block;
	background: #444;
	border-radius: 0;
	font-size: 1.25rem;
	font-weight: 400;
	vertical-align: middle;
	line-height: 1.5;
	text-align: center;
	color: white;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	cursor: pointer;

	&:hover {
		background: #555;
	}

	&:active {
		background: #555;
	}

	&:focus {
		outline: none;
	}
`;

function ControlButton({ hideOn, direction, step, setStep, children }: Props) {
	if (step === hideOn) {
		return null;
	}

	return (
		<Button
			onClick={() => setStep(direction === 'backwards' ? step - 1 : step + 1)}
		>
			{children}
		</Button>
	);
}

const mapStateToProps = (state: State) => ({
	step: state.steps.step,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	setStep,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ControlButton);
