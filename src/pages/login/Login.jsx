import {Typography, TextField, Stack, Button, InputAdornment, IconButton} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AuthCard from '../../components/common/AuthCard';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues={
    email: '',
    password: ''
  }

  const registerSchema = yup.object().shape({
    email:yup
      .string()
      .email('Invalid email!')
      .required('Email is required!'),
    password: yup
      .string()
      .min(8, 'Password must be a minimum of 8 characters')
      .max(12, 'Password must be a maximum of 12 characters')
      .matches(/\d+/, 'Password needs at least 1 number')
      .matches(/[a-z]+/, 'Password needs at least 1 lowercase letter')
      .matches(/[A-Z]+/, 'Password needs at least 1 uppercase letter')
      .required('Password is required'),
  })

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)
    console.log(values)
    dispatch(login(values, navigate))
    actions.resetForm()
  }

  return (
    <AuthCard>
        <Typography variant="h3" align="center" mb={3}>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                type="email"
                variant="standard"
                label="Email"
                name="email"
                margin="dense"                
                error={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) ? errors.email : ''}
                className="w-[80%]"
              />

              <Field
                as={TextField}
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                label="Password"
                className="w-[80%]"
                name="password"
                margin="dense"
                error={
                  Boolean(errors.password) && Boolean(touched.password)
                }
                helperText={
                  Boolean(touched.password) ? errors.password : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ pr: 2 }}>
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack justifyContent="center" alignItems="center" mt={4}>
                <Button variant="contained" type="submit" size="large" className='!bg-orange-600 w-[80%] mb-4'>
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
        <Typography
          variant="subtitle2"
          align="center"
          component="div"
          className='text-gray-800 p-4'>
          Have an account?
        </Typography>
        <Link to="/register" className='hover:text-gray-800 text-orange-600'>Register</Link>
    </AuthCard>
  )
}

export default Login
