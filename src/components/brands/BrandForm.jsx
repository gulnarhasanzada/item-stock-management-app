import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, Field } from 'formik';
import {TextField, Stack, Button} from '@mui/material'
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { createBrand, editBrand } from '../../store/brandSlice';

const BrandForm = ({brand, setOpen, editMode}) => {
    const dispatch = useDispatch();
    const initialValues = {
      name: editMode ? brand.name: '',
      image: editMode ? brand.image: ''
    }
  
    const validationSchema = yup.object().shape({
      name:yup
        .string()
        .required('Brand name is required!'),
      image:yup
        .string()
        .required('Brand image is required!'),
    })
  
    const handleSubmit =(values, actions)=>{
      actions.setSubmitting(false)
      editMode? dispatch(editBrand({...brand, ...values})): dispatch(createBrand(values));
      setOpen(false)
    }
  
    return (
      <>
         <DialogTitle id="alert-dialog-title">
              {editMode? 'Update' : 'Add'} Brand
          </DialogTitle>
          <DialogContent>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched }) => (
              <Form>
                  <Field
                    as={TextField}
                    type="text"
                    variant="standard"
                    label="Brand Name"
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
                    label="Image"
                    name="image"
                    margin="dense"                
                    error={Boolean(errors.image) && Boolean(touched.image)}
                    helperText={Boolean(touched.image) ? errors.image : ''}
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

export default BrandForm
