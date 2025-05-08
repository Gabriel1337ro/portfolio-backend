import mongoose from 'mongoose';
import { User } from '../models/user.model';
import { config } from '../config/config';

const createAdmin = async () => {
  try {
    await mongoose.connect(config.mongoUri);

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@gabb1337.dev' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      email: 'admin@gabb1337.dev',
      password: 'admin123',
      name: 'Admin',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin(); 