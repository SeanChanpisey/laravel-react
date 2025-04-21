import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

export default function ProductForm({ initialData, onSubmit }) {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category_id: 1,
        image_url: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                    label="Description"
                    multiline
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <TextField
                    label="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <TextField
                    label="Stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
                <TextField
                    label="Image URL"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
                <Button type="submit" variant="contained">
                    Save Product
                </Button>
            </Stack>
        </form>
    );
}