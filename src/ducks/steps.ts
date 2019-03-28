import { action } from 'typesafe-actions';

export const SET_STEP = 'SET_STEP';

export const setStep = (step: number) => action(SET_STEP, {
  step,
});

export interface StepsState {
	step: number;
}

const initialState = {
	step: 1,
};

export default function(state = initialState, action: any) {
	const { type, payload } = action;

	switch (type) {
		case SET_STEP:
			return {
				...state,
				step: payload.step,
			};

		default:
			return state;
	}
}
