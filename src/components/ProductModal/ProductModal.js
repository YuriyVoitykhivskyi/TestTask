import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { doc, setDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../configFirebase';

const blankProduct = {
    name: "",
    qty: 0,
    price: 0
  }

export const ProductModal = ({ open, onClose, onSave, product }) =>{

  const [itemForm, setItemForm] = useState(blankProduct);
  const [error, setError] = useState('');
 

  useEffect(() => {
    if (open) {
      setItemForm(product ? {...product} : {...blankProduct});
    }
  }, [open, product]);

  const handleChange = ({ target: { value, name } }) => {
    setItemForm({ ...itemForm, [name]: value });
  }
  const handleSave = async () => {
    const { name, price, qty } = itemForm;
    if (![name, price, qty].every(currentV => Boolean(currentV))) {
      return setError('Please fill all data');
    }
    setError('');
    
      let docRef;
      if (product.id) {
        // Update
        docRef = doc(db,  'products', product.id);
      } else {
        // Create
        docRef = doc(collection(db,  'products'));
      }
      await setDoc(docRef, {
        name,
        qty: Number(qty),
        price: Number(price)
      });
      onSave();
      onClose();
    
  }

    return (
      <Dialog
      open={open}
      onClose={onClose}
    >
      <Box p={2}>
        <Typography mb={2} align="center" variant="h4">{product ? 'Update' : 'Add new'} product:</Typography>
        <Box mb={2} display="flex" flexDirection="column" gap={1}>
          <TextField
            onChange={handleChange}
            name="name"
            value={itemForm.name}
            label={"Product name"}
            variant="standard" />
          <Box display="grid" gap={2} gridTemplateColumns="1fr 3fr">
            <TextField
              onChange={handleChange}
              name="qty"
              value={itemForm.qty}
              type="number"
              label={"Qty"}
              variant="standard" />
            <TextField
              onChange={handleChange}
              name="price"
              value={itemForm.price}
              type="number"
              label={"Price"}
              variant="standard" />
          </Box>
          <TextField
            value={`${(itemForm.qty * itemForm.price).toFixed(2)}`}
            disabled
            label={"Total"}
            variant="standard" />
        </Box>
        {error && <Typography mb={1} align='center' color="red">{error}</Typography>}
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose} color="error" variant="outlined">Close</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </Box>
      </Box>
    </Dialog>
    );
}