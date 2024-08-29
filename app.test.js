const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

let items = [];

app.post('/items', (req, res) => {
    const { name } = req.body;
    const newItem = {
        id: items.length + 1,
        name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

describe('POST /items', () => {
    it('should create a new item', async () => {
        const response = await request(app)
            .post('/items')
            .send({
                name: 'Item 1'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Item 1');
    });
});
