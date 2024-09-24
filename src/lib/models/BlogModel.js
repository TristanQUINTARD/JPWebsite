
import mongoose from "mongoose";

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
        trim: true, // Supprime les espaces en début et fin de chaîne
    },
    category: {
        type: String,
        enum: ['Social Issues', 'History', 'Domestic Politics', 'Philosophy', 'Literary Criticism'], // Assurez-vous que "Startup" est inclus
        required: true
    },
    image: {
        type: String, // Contient le chemin de l'image associée
    },
    date: {
        type: Date,
        default: Date.now, // Définit la date actuelle par défaut
    },
    authorEmail: {
        type: String,
        required: true,
        default: 'anonymous'
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
});

// Créer le modèle pour le blog
const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default BlogModel;
