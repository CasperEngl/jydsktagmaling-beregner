import * as React from 'react';
import { connect } from 'react-redux';
import { FormikErrors, FormikState, FormikTouched } from 'formik';
import * as thousands from 'thousands';
import styled from 'styled-components';

import { StepsState } from '../../ducks/steps';
import { isEmpty } from '../../App';

interface UseFormikConfig {
	initialValues: any;
	handleBlur: (eventOrString: any) => void | ((e: any) => void);
	handleChange: (
		eventOrPath: string | React.ChangeEvent<any>
	) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
	handleReset: () => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
	resetForm: (nextValues?: any | undefined) => void;
	setErrors: (errors: FormikErrors<any>) => void;
	setFormikState: (stateOrCb: FormikState<any> | ((state: FormikState<any>) => FormikState<any>)) => void;
	setFieldTouched: (field: string, touched?: boolean) => void;
	setFieldValue: (field: string, value: any) => void;
	setFieldError: (field: string, value: string | undefined) => void;
	setStatus: (status: any) => void;
	setSubmitting: (isSubmitting: boolean) => void;
	setTouched: (touched: FormikTouched<any>) => void;
	setValues: (values: any) => void;
	submitForm: () => Promise<void>;
	validateForm: (values?: any) => Promise<FormikErrors<any>>;
	validateField: (name: string) => Promise<void> | Promise<string | undefined>;
	isValid: boolean;
	dirty: boolean;
	unregisterField: (name: string) => void;
	registerField: (name: string, { validate }: any) => void;
	getFieldProps: (
		name: string,
		type: string
	) => [
		{
			value: any;
			name: string;
			onChange: (e: React.ChangeEvent<any>) => void;
			onBlur: (e: any) => void;
		},
		{
			value: any;
			error?: string | undefined;
			touch: boolean;
			initialValue?: any;
		}
	];
	validateOnBlur: boolean;
	validateOnChange: boolean;
	values: any;
	errors: FormikErrors<any>;
	touched: FormikTouched<any>;
	isSubmitting: boolean;
	isValidating: boolean;
	status?: any;
	submitCount: number;
}

interface Props {
	step: number;
	form: UseFormikConfig;
}

interface State {
	steps: StepsState;
}

const Title = styled.h5`
	margin: 1rem 0 0.25rem;
	font-size: 1.25rem;
	font-weight: 400;
`;

const Input = styled.input`
	box-sizing: border-box;
	height: auto;
	width: 100%;
	padding: 6px 12px;
	display: block;
	background-color: #f8f9fa;
	border: 2px solid #e4e4e4;
	border-radius: 0;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #495057;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

	&:focus {
		outline: none;
	}
`;

const Radio = styled.input.attrs(() => ({
	type: 'radio',
}))`
	transform: translateY(-2px);
`;

function Steps({ step, form }: Props) {
	const [price, setPrice] = React.useState(0);

	React.useEffect(() => {
		if (document.querySelector('.wpcf7 input[name="book-name"]')) {
			document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-name"]')!.value = form.values.name;
		}
		if (document.querySelector('.wpcf7 input[name="book-email"]')) {
			document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-email"]')!.value = form.values.email;
		}
		if (document.querySelector('.wpcf7 input[name="book-phone"]')) {
			document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-phone"]')!.value = form.values.phone;
		}
		if (document.querySelector('.wpcf7 input[name="book-area"]')) {
			document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-area"]')!.value = form.values.area;
		}
		if (document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-degrees"]')) {
			document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-degrees"]')!.value =
				form.values.degrees === 'above' ? 'Over 30 grader' : 'Under 30 grader';
		}

		if (step === 3 && isEmpty(form.errors) && form.dirty && document.querySelector<HTMLFormElement>('.wpcf7 .wpcf7-form')) {
			document.querySelector<HTMLFormElement>('.wpcf7 .wpcf7-form')!.submit();
		}
	}, [form.values, step]);

	React.useEffect(() => {
		setPrice(0);
	}, [step]);

	if (step === 1) {
		return (
			<>
				<p className="description mb-1">Hvis dit tags hældning er præcis 30 grader, så vælg under 30 grader</p>
				<label htmlFor="degrees-1" className="d-block">
					<Radio
						name="degrees"
						id="degrees-1"
						onChange={() => form.setFieldValue('degrees', 'below')}
						checked={form.values.degrees === 'below'}
					/>
					{' '}
					Under 30 grader
				</label>
				<label htmlFor="degrees-2" className="d-block">
					<Radio
						name="degrees"
						id="degrees-2"
						onChange={() => form.setFieldValue('degrees', 'above')}
						checked={form.values.degrees === 'above'}
					/>
					{' '}
					Over 30 grader
				</label>
				<p className="text-danger font-italic">
					{form.errors && form.errors.degrees ? form.errors.degrees : null}
				</p>
				<Title>Flise areal</Title>
				<p className="description">Totalt areal af dit tag, ikke grundplan</p>
				<Input
					type="number"
					name="area"
					id="area"
					onChange={e => form.setFieldValue('area', e.target.value)}
					value={form.values.area}
				/>
				<p className="error">{form.errors && form.errors.area ? form.errors.area : null}</p>
			</>
		);
	}

	if (step === 2) {
		return (
			<>
				<Title>Navn</Title>
				<Input
					type="text"
					name="full_name"
					id="full_name"
					onChange={e => form.setFieldValue('name', e.target.value)}
					value={form.values.name}
				/>
				<p className="error">{form.errors && form.errors.name ? form.errors.name : null}</p>
				<Title>Email</Title>
				<Input
					type="email"
					name="email"
					id="email"
					onChange={e => form.setFieldValue('email', e.target.value)}
					value={form.values.email}
				/>
				<p className="error">{form.errors && form.errors.email ? form.errors.email : null}</p>
				<Title>Telefon</Title>
				<Input
					type="tel"
					name="phone"
					id="phone"
					onChange={e => form.setFieldValue('phone', e.target.value)}
					value={form.values.phone}
				/>
				<p className="error">{form.errors && form.errors.phone ? form.errors.phone : null}</p>
			</>
		);
	}

	if (step === 3 && isEmpty(form.errors) && form.dirty) {
		const area = Number(form.values.area);
		const tax = 1.25;

		if (price === 0) {
			setPrice(area * (form.values.degrees === 'above' ? 140 : 80) * tax);
		}

		return (
			<>
				<h2 className="text-center">Din pris er {thousands(price, '.')} kr.</h2>
				<p className="description text-center mt-n1">Prisen er vejledende og inkl. moms</p>
				<h1 className="text-center mt-3">Tak, du vil blive kontaktet snarest</h1>
			</>
		);
	}

	return <h1 className="text-center">Husk at udfylde alle felter</h1>;
}

const mapStateToProps = (state: State) => ({
	step: state.steps.step,
});

export default connect(mapStateToProps)(Steps);
