import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, Field } from 'formik';
import { TextField, Stack, Button, Select, MenuItem, InputLabel } from '@mui/material';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createSale, editSale } from '../../store/saleSlice';
import { useEffect } from 'react';
import { getBrands } from '../../store/brandSlice';
import { getProducts } from '../../store/productSlice';

const SaleForm = ({ sale, setOpen, editMode }) => {
  const dispatch = useDispatch();
  const brands = useSelector(state => state.brands.brands);
  const products = useSelector(state => state.products.products);

  const initialValues = {
    quantity: editMode ? sale.quantity : '',
    price: editMode ? sale.price : '',
    brand_id: editMode ? sale.brand_id : '',
    product_id: editMode ? sale.product_id : '',
  };

  const validationSchema = yup.object().shape({
    quantity: yup
      .number()
      .required('Quantity is required!'),
    price: yup
      .number()
      .required('Price is required!'),
    brand_id: yup
      .string()
      .required('Sale brand is required!'),
    product_id: yup
      .string()
      .required('Sale category is required!'),
  });

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    const newSale = {...values, 
                     quantity: parseInt(values.quantity),
                     price: parseFloat(values.price)}
    editMode ? dispatch(editSale({ ...sale, ...values })) : dispatch(createSale(newSale));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {editMode ? 'Update' : 'Add'} Sale
      </DialogTitle>
      <DialogContent className='!min-w-[30vw]'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, values, handleChange }) => (
            <Form>
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
              <InputLabel id="product-select-label" className='mt-4'>Product</InputLabel>
              <Select
                labelId="product-select-label"
                name="product_id"
                value={values.product_id}
                onChange={handleChange}
                className="w-full"
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
              <Field
                as={TextField}
                type="text"
                variant="standard"
                label="Quantity"
                name="quantity"
                margin="dense"
                error={Boolean(errors.quantity) && Boolean(touched.quantity)}
                helperText={Boolean(touched.quantity) ? errors.quantity : ''}
                className="w-full"
              />
              <Field
                as={TextField}
                type="text"
                variant="standard"
                label="Price"
                name="price"
                margin="dense"
                error={Boolean(errors.price) && Boolean(touched.price)}
                helperText={Boolean(touched.price) ? errors.price : ''}
                className="w-full"
              />
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

export default SaleForm
