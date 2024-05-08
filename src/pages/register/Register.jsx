import {Typography, TextField, Stack, Button, InputAdornment, IconButton} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
//import login from authSlice //
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AuthCard from '../../components/common/AuthCard';
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const initialValues={
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  }

  const registerSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Valid email required')
      .required('Valid email required'),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    password: yup
      .string()
      .min(8, 'Password needs at least 8 characters')
      .max(12)
      .matches(/\d+/, 'Password needs at least 1 number')
      .matches(/[a-z]+/, 'Password needs at least 1 lowercase letter')
      .matches(/[A-Z]+/, 'Password needs at least 1 uppercase letter')
      .required('Password is required'),
  })

  const handleSubmit = (values, actions) => {
    // actions.setSubmitting(false)
    // dispatch(login(values, navigate))
    // actions.resetForm()
  }

  return (
    <AuthCard>
        <Typography variant="h3" align="center" mb={3}>
          Register
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
                type="text"
                variant="standard"
                label="Firstname"
                name="first_name"
                margin="dense"                
                error={Boolean(errors.first_name) && Boolean(touched.first_name)}
                helperText={Boolean(touched.first_name) ? errors.first_name : ''}
                className="w-[80%]"
              />
              <Field
                as={TextField}
                type="text"
                variant="standard"
                label="Lastname"
                name="last_name"
                margin="dense"                
                error={Boolean(errors.last_name) && Boolean(touched.last_name)}
                helperText={Boolean(touched.last_name) ? errors.last_name : ''}
                className="w-[80%]"
              />
              <Field
                as={TextField}
                type="text"
                variant="standard"
                label="Username"
                name="username"
                margin="dense"                
                error={Boolean(errors.username) && Boolean(touched.username)}
                helperText={Boolean(touched.username) ? errors.username : ''}
                className="w-[80%]"
              />
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
                <Button variant="contained" type="submit" size="large" className='!bg-orange-600 w-[80%]'>
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
        <Link to="/" className='hover:text-gray-800 text-orange-600'>Login</Link>
    </AuthCard>
  )
}

export default Login
