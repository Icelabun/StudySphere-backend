const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory user storage (replace with a database in production)
const users = [];

// JWT secret (use environment variable in production)
const JWT_SECRET = 'your-secret-key';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, userType, grade, subjects, qualifications, expertise } = req.body;

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      userType,
      grade,
      subjects,
      qualifications,
      expertise,
      profileCompleted: false
    };

    users.push(user);

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    // Return user data (excluding password)
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    // Return user data (excluding password)
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 