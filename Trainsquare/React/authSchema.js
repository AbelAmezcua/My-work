import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    email: Yup.string().min(2).max(100).required('Please enter Email').email('Please enter valid Email'),
    password: Yup.string().min(2).max(100).required('Please enter password'),
});

const registerSchema = Yup.object().shape({
    email: Yup.string().min(2).max(100).required('Please enter Email').email('Please enter valid Email'),
    password: Yup.string()
        .min(8)
        .max(100)
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    passwordConfirm: Yup.string()
        .min(8)
        .max(100)
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const passwordResetSchema = Yup.object().shape({
    password: Yup.string()
        .min(8)
        .max(100)
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    passwordConfirm: Yup.string()
        .min(8)
        .max(100)
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().min(2).max(100).required('Please enter Email').email('Please enter valid Email'),
});

export { loginSchema, registerSchema, passwordResetSchema, forgotPasswordSchema };
