import { Formik, Form, Field } from 'formik'
import { Typography, TextField, Stack, Button, InputAdornment, IconButton} from '@mui/material'
import * as yup from 'yup'
import { useDispatch} from 'react-redux'
import { changePassword } from '../../store/authSlice'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const PasswordChangeForm = () => {
  const initialValues= {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const dispatch = useDispatch();

  const registerSchema = yup.object().shape({
    newPassword: yup
      .string()
      .min(8, 'Password needs at least 8 characters')
      .max(12)
      .matches(/\d+/, 'Password needs at least 1 number')
      .matches(/[a-z]+/, 'Password needs at least 1 lowercase letter')
      .matches(/[A-Z]+/, 'Password needs at least 1 uppercase letter')
      .required('New password is required'),
    confirmNewPassword: yup.string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
  })

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)
    dispatch(changePassword(values.newPassword))
    actions.resetForm()
  }
  return (
    <>
      <Typography variant="h6" my={3}>
          Change Password
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
                type={showCurrentPassword ? 'text' : 'password'}
                variant="standard"
                label="Current Password"
                className="w-full"
                name="currentPassword"
                margin="dense"
                error={
                  Boolean(errors.currentPassword) && Boolean(touched.currentPassword)
                }
                helperText={
                  Boolean(touched.currentPassword) ? errors.currentPassword : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ pr: 2 }}>
                      <IconButton
                        edge="end"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                as={TextField}
                type={showNewPassword ? 'text' : 'password'}
                variant="standard"
                label="Password"
                className="w-full"
                name="newPassword"
                margin="dense"
                error={
                  Boolean(errors.newPassword) && Boolean(touched.newPassword)
                }
                helperText={
                  Boolean(touched.newPassword) ? errors.newPassword : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ pr: 2 }}>
                      <IconButton
                        edge="end"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Field
                as={TextField}
                type={showConfirmNewPassword ? 'text' : 'password'}
                variant="standard"
                label="Password"
                className="w-full"
                name="confirmNewPassword"
                margin="dense"
                error={
                  Boolean(errors.confirmNewPassword) && Boolean(touched.confirmNewPassword)
                }
                helperText={
                  Boolean(touched.confirmNewPassword) ? errors.confirmNewPassword : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ pr: 2 }}>
                      <IconButton
                        edge="end"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      >
                        {showConfirmNewPassword ? (
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
                <Button variant="contained" type="submit" size="large" className='!bg-red-500 w-[100%]'>
                  Update
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
    </>
  )
}

export default PasswordChangeForm
