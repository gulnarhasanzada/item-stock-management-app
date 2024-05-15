import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, Field } from 'formik';
import { TextField, Stack, Button, Select, MenuItem, InputLabel } from '@mui/material';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, editProduct } from '../../store/productSlice';
import { useEffect } from 'react';
import { getBrands } from '../../store/brandSlice';
import { getCategories } from '../../store/categorySlice';

const ProductForm = ({ product, setOpen, editMode }) => {
  const dispatch = useDispatch();
  const brands = useSelector(state => state.brands.brands);
  const categories = useSelector(state => state.categories.categories);

  const initialValues = {
    name: editMode ? product.name : '',
    brand_id: editMode ? product.brand_id : '',
    category_id: editMode ? product.category_id : '',
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Product name is required!'),
    brand_id: yup
      .string()
      .required('Product brand is required!'),
    category_id: yup
      .string()
      .required('Product category is required!'),
  });

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    editMode ? dispatch(editProduct({ ...product, ...values })) : dispatch(createProduct(values));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {editMode ? 'Update' : 'Add'} Product
      </DialogTitle>
      <DialogContent className='!min-w-[30vw]'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Field
                as={TextField}
                type="text"
                variant="standard"
                label="Product Name"
                name="name"
                margin="dense"
                error={Boolean(errors.name) && Boolean(touched.name)}
                helperText={Boolean(touched.name) ? errors.name : ''}
                className="w-full"
              />
              <InputLabel id="brand-select-label" className='mt-4'>Brand</InputLabel>
              <Select
                labelId="brand-select-label"
                name="brand_id"
                value={values.brand_id}
                onChange={handleChange}
                className="w-full"
              >
                {brands.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id="category-select-label" className='mt-4'>Category</InputLabel>
              <Select
                labelId="category-select-label"
                name="category_id"
                value={values.category_id}
                onChange={handleChange}
                className="w-full"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <Stack justifyContent="center" alignItems="center" mt={4}>
                <Button variant="contained" type="submit" size="large" className='!bg-red-500 w-full mb-4'>
                  {editMode ? 'Update' : 'Add'}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
};

export default ProductForm;
