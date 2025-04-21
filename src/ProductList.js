import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/products');
    setProducts(res.data);
  };
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    if (editId) {
      // Update existing product
      await axios.post(`http://127.0.0.1:8000/api/products/${editId}`, {
        ...form,
        _method: 'PUT',
      });
    } else {
      // Create new product
      await axios.post('http://127.0.0.1:8000/api/products', form);
    }
    fetchProducts();
    handleClose();
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.post(`http://127.0.0.1:8000/api/products/${id}`, {
          _method: 'DELETE',
        });
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert('Failed to delete product.');
      }
    }
  };
  

  const handleOpen = () => {
    setEditId(null);
    setForm({ name: '', description: '', price: '', stock: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    setForm({ name: '', description: '', price: '', stock: '' });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: 16 }}>
        Add Product
      </Button>

      {/* Table Display */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                
                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Product Name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={form.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={form.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="stock"
            label="Stock"
            type="number"
            fullWidth
            value={form.stock}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddOrUpdate} color="primary">
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
