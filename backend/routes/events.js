const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { main_event } = req.query;
    let query = {};

    if (main_event) {
      query.main_event = main_event;
    } else {
      // If no main_event specified, get main events (where main_event is null)
      query.main_event = null;
    }

    const events = await Event.find(query)
      .populate('coordinator_id', 'name email')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('coordinator_id', 'name email mobile');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/events/main/:mainEvent
// @desc    Get sub-events under a main event
// @access  Public
router.get('/main/:mainEvent', async (req, res) => {
  try {
    const events = await Event.find({ main_event: req.params.mainEvent })
      .populate('coordinator_id', 'name email')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error('Get sub-events error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/events
// @desc    Create main event (Admin only)
// @access  Private (Admin)
router.post('/', authenticate, authorize('admin'), [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('venue').trim().notEmpty().withMessage('Venue is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, date, venue } = req.body;

    // Generate event_id
    const count = await Event.countDocuments();
    const event_id = `EVT${new Date().getFullYear()}_${String(count + 1).padStart(5, '0')}`;

    const event = new Event({
      event_id,
      main_event: null, // Main event
      title,
      description,
      date,
      venue
    });

    await event.save();

    res.status(201).json({
      message: 'Main event created successfully',
      event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/events/sub-events
// @desc    Create sub-event (Admin only)
// @access  Private (Admin)
router.post('/sub-events', authenticate, authorize('admin'), [
  body('main_event').trim().notEmpty().withMessage('Main event name is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('venue').trim().notEmpty().withMessage('Venue is required'),
  body('coordinator_id').optional().isMongoId().withMessage('Invalid coordinator ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { main_event, title, description, date, venue, coordinator_id } = req.body;

    // Verify coordinator exists and is a coordinator
    if (coordinator_id) {
      const coordinator = await User.findById(coordinator_id);
      if (!coordinator || coordinator.role !== 'coordinator') {
        return res.status(400).json({ message: 'Invalid coordinator' });
      }
    }

    // Generate event_id
    const count = await Event.countDocuments();
    const event_id = `EVT${new Date().getFullYear()}_${String(count + 1).padStart(5, '0')}`;

    const event = new Event({
      event_id,
      main_event,
      title,
      description,
      date,
      venue,
      coordinator_id: coordinator_id || null
    });

    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('coordinator_id', 'name email');

    res.status(201).json({
      message: 'Sub-event created successfully',
      event: populatedEvent
    });
  } catch (error) {
    console.error('Create sub-event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event (Admin only)
// @access  Private (Admin)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { title, description, date, venue, coordinator_id } = req.body;

    if (coordinator_id) {
      const coordinator = await User.findById(coordinator_id);
      if (!coordinator || coordinator.role !== 'coordinator') {
        return res.status(400).json({ message: 'Invalid coordinator' });
      }
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, venue, coordinator_id },
      { new: true, runValidators: true }
    ).populate('coordinator_id', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event (Admin only)
// @access  Private (Admin)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;


