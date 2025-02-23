const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

let tshirts = []; // Store T-shirts in memory (for now)

// Start server
app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));

// Get all T-shirts
app.get('/tshirt', (req, res) => {
    res.status(200).json(tshirts);
});

// Get a specific T-shirt by ID
app.get('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const tshirt = tshirts.find(item => item.id === id);

    if (!tshirt) {
        return res.status(404).json({ message: 'T-shirt not found' });
    }

    res.status(200).json(tshirt);
});

// Create a new T-shirt
app.post('/tshirt', (req, res) => {
    const { id, logo, size } = req.body;

    if (!id || !logo || !size) {
        return res.status(400).json({ message: 'ID, logo, and size are required' });
    }

    const newTshirt = { id, logo, size };
    tshirts.push(newTshirt);

    res.status(201).json({ message: 'T-shirt created', tshirt: newTshirt });
});

// Update an existing T-shirt by ID
app.put('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo, size } = req.body;

    const tshirt = tshirts.find(item => item.id === id);
    if (!tshirt) {
        return res.status(404).json({ message: 'T-shirt not found' });
    }

    if (logo) tshirt.logo = logo;
    if (size) tshirt.size = size;

    res.status(200).json({ message: 'T-shirt updated', tshirt });
});

// Delete a T-shirt by ID
app.delete('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const index = tshirts.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'T-shirt not found' });
    }

    tshirts.splice(index, 1);
    res.status(200).json({ message: 'T-shirt deleted' });
});
