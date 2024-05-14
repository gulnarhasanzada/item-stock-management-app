import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, Field } from 'formik';
import {TextField, Stack, Button} from '@mui/material'
import { editCategory, createCategory } from '../../store/categorySlice';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';

const CategoryForm = ({category, setOpen, editMode}) => {
  const dispatch = useDispatch();
  const initialValues = {
    name: editMode ? category.name: ''
  }

  const validationSchema = yup.object().shape({
    name:yup
      .string()
      .required('Category name is required!'),
  })

  const handleSubmit =(values, actions)=>{
    actions.setSubmitting(false)
    editMode? dispatch(editCategory({...category, ...values})): dispatch(createCategory(values.name));
    setOpen(false)
  }

  return (
    <>
       <DialogTitle id="alert-dialog-title">
            {editMode? 'Update' : 'Add'} Category
        </DialogTitle>
        <DialogContent>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
            <Form>
                <Field
                as={TextField}
                type="text"
                variant="standard"
                label="Category"
                name="name"
                margin="dense"                
                error={Boolean(errors.categoryName) && Boolean(touched.categoryName)}
                helperText={Boolean(touched.categoryName) ? errors.categoryName : ''}
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

export default CategoryForm
