import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import Progress from './components/Progress';
import ControlButton from './components/ControlButton';
import Steps from './components/Steps';

import rootReducer from './rootReducer';

const middleware = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export function isEmpty(obj: any) {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}

const Container = styled.div`
	box-sizing: border-box;
	margin: 0 auto;
	padding: 1.5rem;
	width: 100%;
	max-width: 1200px;
	background: #F8F9FA;
`;

const Row = styled.div`
	margin-top: 3rem;
	display: flex;
	justify-content: center;
`;

const Column = styled.div`
	width: auto;
`;

function App() {
	const form = useFormik({
    initialValues: {
      name: '',
      email: '',
			phone: '',
			degrees: null,
			area: '',
    },
    validationSchema: Yup.object().shape({
			area: Yup.number()
				.required('Påkrævet'),
      name: Yup.string()
        .min(2, 'Påkrævet')
        .required('Påkrævet'),
      email: Yup.string()
        .email('Denne emailadresse ser ikke korrekt ud')
        .required('Påkrævet'),
      phone: Yup.string()
        .min(8, 'Vi ønkser du udfylder 8 tal')
        .required('Påkrævet'),
    }),
		onSubmit: console.log,
	});
	
	return (
		<Provider store={store}>
			<Container>
				<Progress />
				<Steps form={form} />
				<Row className="justify-content-center">
					<Column>
						<ControlButton direction="backwards" hideOn={1}>
							&#171; Forrige
						</ControlButton>
					</Column>
					<Column>
						<ControlButton direction="forwards" hideOn={3}>
							Næste &#187;
						</ControlButton>
					</Column>
				</Row>
			</Container>
		</Provider>
	);
}

export default App;
