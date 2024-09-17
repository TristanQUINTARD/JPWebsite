import mongoose from 'mongoose';

// Définir le schéma pour le blog
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Le titre est requis
    trim: true, // Supprime les espaces en début et fin de chaîne
  },
  description: {
    type: String,
    required: true, // La description est requise
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Technology", "Science", "Business", "Health", "Startup"],
    default: "Startup",
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

// Créer le modèle pour le blog
const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default BlogModel;