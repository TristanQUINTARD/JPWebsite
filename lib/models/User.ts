<<<<<<< HEAD

import mongoose from 'mongoose';



const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      
    },
    lastname: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      unique: true,
      required: true,
      
      lowercase: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      select: false, // Typically set to false to allow for initial user creation
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    image: { type: String },
    authProviderId: { type: String },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Ensure the model is not recompiled if it already exists
export const User = mongoose.models?.User || mongoose.model('User', userSchema);


=======
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      
    },
    lastname: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      unique: true,
      required: true,
      
      lowercase: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      select: false, // Typically set to false to allow for initial user creation
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    image: { type: String },
    authProviderId: { type: String },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Ensure the model is not recompiled if it already exists
export const User = mongoose.models?.User || mongoose.model('User', userSchema);


>>>>>>> 4448097 (ajout name sur list Articles, Lettrine article + box name)
