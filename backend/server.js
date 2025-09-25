require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' }});
const cors = require('cors');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const Order = require('./models/Order');

connectDB(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// routes
app.use('/api/orders', orderRoutes);
app.use('/api/admin', authRoutes);

// Emit socket event whenever a new order is created.
// Simple approach: watch the collection change (requires replica set for change streams).
// For simplicity, we'll patch createOrder: after creating an order, the controller returns it.
// Instead we use a polling/listener — but an easy approach: listen to 'new-order' from controllers.
// To keep code minimal: we'll patch createOrder to emit using a global `io` reference via app.set.
// Provide io to controllers via req.app.get('io')
app.set('io', io);

// Listen for orders created via Mongoose post middleware (optional)
Order.watch().on('change', data => {
  if (data.operationType === 'insert') {
    const full = data.fullDocument;
    io.emit('newOrder', full);
  }
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
});

// central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
