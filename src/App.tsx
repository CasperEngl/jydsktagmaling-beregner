import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Container, Row, Col } from 'reactstrap';

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
			degrees: Yup.mixed()
				.oneOf(['above', 'below'], 'Husk at vælge enten over eller under')
				.required('Påkrævet'),
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
			<Container className="bg-light p-5">
				<Progress />
				<Steps form={form} />
				<Row className="mt-5 justify-content-center">
					<Col xs="auto">
						<ControlButton direction="backwards" hideOn={1}>
							&#171; Forrige
						</ControlButton>
					</Col>
					<Col xs="auto">
						<ControlButton direction="forwards" hideOn={3}>
							Næste &#187;
						</ControlButton>
					</Col>
				</Row>
				<div className="wpcf7 mt-5">
					<form method="GET" className="wpcf7-form">
						<input type="text" name="book-name" />
						<input type="text" name="book-email" />
						<input type="text" name="book-phone" />
						<input type="text" name="book-m2" />
						<input type="text" name="book-degrees"/>
					</form>
				</div>
			</Container>
		</Provider>
	);
}

export default App;
