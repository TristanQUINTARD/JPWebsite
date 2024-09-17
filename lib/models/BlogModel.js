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
        required: true, // La catégorie est requise
        enum: ["Technology", "Science", "Business", "Health", "Startup"], // Liste des catégories possibles
        default: "Startup" // Valeur par défaut
    },
    image: {
        type: String, // Contient le chemin de l'image associée
        required: true, // L'image est requise
    },
    date: {
        type: Date,
        default: Date.now, // Définit la date actuelle par défaut
    }
});

// Créer le modèle pour le blog
const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default BlogModel;
