import * as React from 'react';
import { connect } from 'react-redux';
import { FormikErrors, FormikState, FormikTouched } from 'formik';
import * as thousands from 'thousands';

import { FormGroup, Label, Input } from 'reactstrap';

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

function Steps({ step, form }: Props) {
	const [price, setPrice] = React.useState(0);

	React.useEffect(() => {
		document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-name"]')!.value = form.values.name;
		document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-email"]')!.value = form.values.email;
		document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-phone"]')!.value = form.values.phone;
		document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-area"]')!.value = form.values.area;
		document.querySelector<HTMLInputElement>('.wpcf7 input[name="book-degrees"]')!.value = form.values.degrees === 'above' ? 'Over 30 grader' : 'Under 30 grader';

		// if (step === 3 && isEmpty(form.errors) && form.dirty) {
		// 	document.querySelector<HTMLFormElement>('.wpcf7 .wpcf7-form')!.submit();
		// }
	}, [form.values, step]);

	React.useEffect(() => {
		setPrice(0);
	}, [step]);

	if (step === 1) {
		return (
			<>
				<p className="description mb-1">Hvis dit tags hældning er præcis 30 grader, så vælg under 30 grader</p>
				<FormGroup check>
					<Label check>
						<Input 
							type="radio"
							name="degrees"
							onChange={() => form.setFieldValue('degrees', 'below')}
							checked={form.values.degrees === 'below'}
						/>{' '}
						Under 30 grader
					</Label>
				</FormGroup>
				<FormGroup check>
					<Label check>
						<Input 
							type="radio"
							name="degrees"
							onChange={() => form.setFieldValue('degrees', 'above')}
							checked={form.values.degrees === 'above'}
						/>{' '}
						Over 30 grader
					</Label>
				</FormGroup>
        <p className="text-danger font-italic">
          {form.errors && form.errors.degrees ? form.errors.degrees : null}
        </p>
				<p className="h5 mt-3">Tag areal</p>
				<FormGroup>
					<Label>
						<p className="description">Totalt areal af dit tag, ikke grundplan</p>
						<Input
							type="number"
							name="area"
							id="area"
							onChange={e => form.setFieldValue('area', e.target.value)}
							value={form.values.area}
						/>
            <p className="text-danger font-italic">
							{form.errors && form.errors.area ? form.errors.area : null}
						</p>
					</Label>
				</FormGroup>
			</>
		);
	}

	if (step === 2) {
		return (
			<>
				<FormGroup>
					<Label>
						<p className="h5">Navn</p>
						<Input
							type="text"
							name="full_name"
							id="full_name"
							onChange={e => form.setFieldValue('name', e.target.value)}
							value={form.values.name}
						/>
						<p className="text-danger font-italic">
							{form.errors && form.errors.name ? form.errors.name : null}
						</p>
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>
						<p className="h5">Email</p>
						<Input
							type="email"
							name="email"
							id="email"
							onChange={e => form.setFieldValue('email', e.target.value)}
							value={form.values.email}
						/>
						<p className="text-danger font-italic">
							{form.errors && form.errors.email ? form.errors.email : null}
						</p>
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>
						<p className="h5">Telefon</p>
						<Input
							type="tel"
							name="phone"
							id="phone"
							onChange={e => form.setFieldValue('phone', e.target.value)}
							value={form.values.phone}
						/>
						<p className="text-danger font-italic">
							{form.errors && form.errors.phone ? form.errors.phone : null}
						</p>
					</Label>
				</FormGroup>
			</>
		);
	}

	if (step === 3 && isEmpty(form.errors) && form.dirty) {
		if (price === 0) {
			setPrice(Number(form.values.area) * (form.values.degrees === 'above' ? 140 :  80) * 1.25);
		}

		return (
			<>
				<h2 className="text-center">Din pris er {thousands(price, '.')} kr.</h2>
				<p className="description text-center mt-n1">Prisen er vejledende og inkl. moms</p>
				<h1 className="text-center mt-3">Tak, du vil blive kontaktet snarest</h1>
			</>
		)
	}

	return <h1 className="text-center">Husk at udfylde alle felter</h1>;
}

const mapStateToProps = (state: State) => ({
	step: state.steps.step,
});

export default connect(mapStateToProps)(Steps);
