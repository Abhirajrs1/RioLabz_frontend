import * as Yup from 'yup';

const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),

  email: Yup.string()
    .trim()
    .email('Invalid email format')
    .matches(/^[^\s@]+@gmail\.com$/, 'Only Gmail addresses are allowed')
    .required('Email is required'),

  password: Yup.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default registerValidationSchema;
