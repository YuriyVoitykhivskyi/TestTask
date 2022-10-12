import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { ProductModal } from '../ProductModal/ProductModal';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../../configFirebase';


export const ProductItems = () =>{

    const [products, setProducts] = useState([]);
    const [productForEdit, setProductForEdit] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    
  
     const loadProducts = useCallback(async () => {
      
       const productsRef = query(collection(db,  'products'));

         const data = await getDocs(productsRef);
         setProducts(data.docs
           .map(doc => ({id: doc.id, ...doc.data()}))
         );
     }, []);
  
     useEffect(() => {
       loadProducts();
     }, [loadProducts]);
  
    const handleEdit = (product) => {
      
      setProductForEdit(product);
      setModalOpen(true);
    }
    const handleAddProduct = () => {
      setProductForEdit(null);
      setModalOpen(true);
    }
    const handleDelete = async (product) => {

      if (window.confirm("Are you sure u want to delete this product") === true) {
        await deleteDoc(doc(db,  'products', product.id));
        console.log(products);
      setProducts(products.filter(currentV => currentV.id !== product.id))
      } else {
        return;
      }
    }


return (
    <Box>
      <Box display='flex' justifyContent="flex-end">
        <Button onClick={handleAddProduct} variant='outlined'><Add /> Add item</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {["Product name", "Qty", "Price", "Total", 'Edit/Delete'].map((currentV) => <TableCell key={currentV}>{currentV}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length ?  products.map((product, idx) => <TableRow key={idx}>
            <TableCell>{product.name}</TableCell>
            <TableCell width={2}>{product.qty}</TableCell>
            <TableCell width={3}>${product.price.toFixed(2)}</TableCell>
            <TableCell width={4}>${(product.qty * product.price).toFixed(2)}</TableCell>
            <TableCell width={3} align='right'>
              <Box justifyContent='flex-end' display='flex' alignItems='center'>
                <IconButton size='small' onClick={() => handleEdit(product)}><Edit /></IconButton>
                <IconButton size='small' onClick={() => handleDelete(product)}><Delete /></IconButton>
              </Box>
            </TableCell>
          </TableRow>)
            : <TableRow>
              <TableCell colSpan={5} align="center">
                  <Box display="flex" alignItems="center" flexDirection="column">
                    <Typography mb={1}>You have no items.</Typography>
                    <Button onClick={handleAddProduct} size="small" variant='outlined'><Add /> Add item</Button>
                  </Box>
                
              </TableCell>
            </TableRow>
          }
        </TableBody>
        <ProductModal 
          product={productForEdit} 
          open={modalOpen} 
          onSave={() => loadProducts()} 
          onClose={() => setModalOpen(false)} />
      </Table>
    </Box>
  );
}