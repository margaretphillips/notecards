const routes = require('express').Router();
const Handler = require('./handler');

routes.get('/', (req, res) => {
    res.status(200).json({ status: 'connected' });
});

routes.get('/notes', (req, res) => {
    const handler = new Handler('notes');
    res.status(200).json(handler.readFile());
});

routes.post('/notes', (req, res) => {
    const handler = new Handler('notes');
    res.status(200).json(handler.createNote(req.body));
});

routes.put('/notes/:id', (req, res) => {
    const handler = new Handler('notes');
    res.status(200).json(handler.updateNote(req.body));
});

routes.delete('/notes/:id', (req, res) => {
    const handler = new Handler('notes');
    res.status(200).json(handler.deleteNote(req.params.id));
});

routes.get('/categories', (req, res) => {
    const data = new Handler('categories');
    res.status(200).json(data.readFile());
});
routes.get('/priorities', (req, res) => {
    const data = new Handler('priorities');
    res.status(200).json(data.readFile());
});
routes.get('/themes', (req, res) => {
    const data = new Handler('themes');
    res.status(200).json(data.readFile());
});





module.exports = routes;