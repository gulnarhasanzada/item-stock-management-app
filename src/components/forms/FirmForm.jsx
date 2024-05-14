import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, Field } from 'formik';
import {TextField, Stack, Button} from '@mui/material'
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { createFirm, editFirm } from '../../store/firmSlice';

const FirmForm = ({firm, setOpen, editMode}) => {
    const dispatch = useDispatch();
    const initialValues = {
      name: editMode ? firm.name: '',
      image: editMode ? firm.image: '',
      phone: editMode ? firm.phone: '',
      address: editMode ? firm.address: ''
    }
  
    const validationSchema = yup.object().shape({
      name:yup
        .string()
        .required('Firm name is required!'),
      image:yup
        .string()
        .required('Firm image is required!'),
      phone:yup
        .string()
        .required('Firm phone number is required!'),
      address:yup
        .string()
        .required('Firm address is required!'),
    })
  
    const handleSubmit =(values, actions)=>{
      actions.setSubmitting(false)
      editMode? dispatch(editFirm({...firm, ...values})): dispatch(createFirm(values));
      setOpen(false)
    }
  
    return (
      <>
         <DialogTitle id="alert-dialog-title">
              {editMode? 'Update' : 'Add'} Firm
          </DialogTitle>
          <DialogContent>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched }) => (
              <Form>
                  <Field
                    as={TextField}
                    type="text"
                    variant="standard"
                    label="Firm Name"
                    name="name"
                    margin="dense"                
                    error={Boolean(errors.name) && Boolean(touched.name)}
                    helperText={Boolean(touched.name) ? errors.name : ''}
                    className="w-full"
                  />
                  <Field
                    as={TextField}
                    type="text"
                    variant="standard"
                    label="Image Url"
                    name="image"
                    margin="dense"                
                    error={Boolean(errors.image) && Boolean(touched.image)}
                    helperText={Boolean(touched.image) ? errors.image : ''}
                    className="w-full"
                  />
                  <Field
                    as={TextField}
                    type="text"
                    variant="standard"
                    label="Phone Number"
                    name="phone"
                    margin="dense"                
                    error={Boolean(errors.phone) && Boolean(touched.phone)}
                    helperText={Boolean(touched.phone) ? errors.phone : ''}
                    className="w-full"
                  />
                  <Field
                    as={TextField}
                    type="text"
                    variant="standard"
                    label="Address"
                    name="address"
                    margin="dense"                
                    error={Boolean(errors.address) && Boolean(touched.address)}
                    helperText={Boolean(touched.address) ? errors.address : ''}
                    className="w-full"
                  />
                  <Stack justifyContent="center" alignItems="center" mt={4}>
                  <Button variant="contained" type="submit" size="large" className='!bg-red-500 w-full mb-4'>
                      {editMode? 'Update' : 'Add'}
                  </Button>
                  </Stack>
              </Form>
              )}
              </Formik>
          </DialogContent>
      </>
    )
}

export default FirmForm
