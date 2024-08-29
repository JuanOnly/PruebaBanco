const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Lista para almacenar los datos (simulando una base de datos)
let items = [];

// CREATE: Añadir un nuevo ítem
app.post('/items', (req, res) => {
    const { name } = req.body;
    console.log("Received name:", name); // Log the name received from the request body
    const newItem = {
        id: items.length + 1,
        name
    };
    items.push(newItem);
    console.log("New item:", newItem); // Log the new item to verify it's being created correctly
    res.status(201).json(newItem);
});


// READ: Obtener todos los ítems
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

// READ: Obtener un ítem por ID
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
});

// UPDATE: Actualizar un ítem por ID
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    item.name = name;
    res.status(200).json(item);
});

// DELETE: Eliminar un ítem por ID
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = items.findIndex(i => i.id === parseInt(id));
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    items.splice(itemIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
