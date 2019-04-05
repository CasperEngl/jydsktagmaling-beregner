import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { StepsState } from '../../ducks/steps';

interface Props {
	step: number;
}

interface State {
	steps: StepsState;
}

interface BarInnerProps {
	width: number;
}

const ProgressBar = styled.div`
	overflow: hidden;
	margin-bottom: .5rem;
	height: .2rem;
	display: flex;
	background-color: #e9ecef;
	font-size: .75rem;
`;

const ProgressInner = styled.div`
	width: ${(props: BarInnerProps) => props.width}%;
  display: flex;
	flex-direction: column;
	justify-content: center;
	white-space: nowrap;
	background: #444;
	transition: width .6s ease;
`;

const Step = styled.div`
	margin-bottom: 2rem;
	font-size: 1rem;
	font-weight: 300;
`;

function Progress({ step }: Props) {
	return (
    <>
			<ProgressBar>
				<ProgressInner width={step * 100 / 3} />
			</ProgressBar>
      <Step>{step} / 3</Step>
    </>
	);
}

const mapStateToProps = (state: State) => ({
	step: state.steps.step,
});

export default connect(mapStateToProps)(Progress);
