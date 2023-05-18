const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(express.json());
// Define an array to store events (replace with database integration in actual
implementation)
const events = [];
// GET /api/v3/app/events?id=:event_id - Get an event by its unique ID
app.get('/api/v3/app/events', (req, res) => {
const eventId = req.query.id;
const event = events.find((event) => event.id === eventId);
if (!event) {
return res.status(404).json({ error: 'Event not found' });
}
return res.json(event);
});
// GET /api/v3/app/events?type=latest&limit=5&page=1 - Get events by recency and
pagination
app.get('/api/v3/app/events', (req, res) => {
const { type, limit, page } = req.query;
// Logic to fetch events by recency and paginate the results
// Replace with actual implementation
return res.json({ events: [] }); // Placeholder response
});
// POST /api/v3/app/events - Create a new event
app.post('/api/v3/app/events', upload.single('image'), (req, res) => {
const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank
} = req.body;
const image = req.file;
// Generate a unique ID for the event (replace with actual ID generation logic)
const eventId = generateEventId();
// Create the event object
const event = {
id: eventId,
name,
tagline,
schedule,
description,
moderator,
category,
sub_category,
rigor_rank,
image: image ? image.filename : null, // Store the filename of the uploaded image
attendees: []
};
// Add the event to the events array (replace with database insertion in actual
implementation)
events.push(event);
return res.json({ id: eventId });
});
// PUT /api/v3/app/events/:id - Update an existing event
app.put('/api/v3/app/events/:id', upload.single('image'), (req, res) => {
const eventId = req.params.id;
const event = events.find((event) => event.id === eventId);
if (!event) {
return res.status(404).json({ error: 'Event not found' });
}
const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank
} = req.body;
const image = req.file;
// Update the event properties
event.name = name;
event.tagline = tagline;
event.schedule = schedule;
event.description = description;
event.moderator = moderator;
event.category = category;
event.sub_category = sub_category;
event.rigor_rank = rigor_rank;
event.image = image ? image.filename : event.image; // Update the image only if a new
image was uploaded
return res.json({ success: true });
});
// DELETE /api/v3/app/events/:id - Delete an event
app.delete('/api/v3/app/events/:id', (req, res) => {
const eventId = req.params.id;
const eventIndex = events.findIndex((event) => event.id === eventId);
if (eventIndex === -1) {
return res.status(404).json({ error: 'Event not found' });
}
// Remove the event
