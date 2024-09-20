import { ConnectDB } from "./../../../../lib/config/db";
import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises"; // Importez correctement `unlink` pour la suppression de fichiers
import BlogModel from "./../../../../lib/models/BlogModel";
import mongoose from "mongoose";
import next from "next";


const LoadDB = async () => {
    await ConnectDB();
};

// Exécutez LoadDB à chaque appel d'endpoint pour vous assurer que la connexion est établie
export async function GET(request) {
    await LoadDB(); // Assurez-vous que la DB est connectée avant d'exécuter la requête

    try {
        const blogId = request.nextUrl.searchParams.get("id");
        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            return NextResponse.json({ blog });
        } else {
            const blogs = await BlogModel.find({});
            return NextResponse.json({ blogs });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des blogs:", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des blogs" }, { status: 500 });
    }
}

export async function POST(request) {
    await LoadDB(); // Assurez-vous que la DB est connectée avant d'exécuter la requête

    try {
        const formData = await request.formData();
        const timestamp = new Date().getTime();
        const image = formData.get("image");

        let imgUrl = '';
        if (image) {
            const imageByteData = await image.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const imagePath = `public/${timestamp}_${image.name}`;
            await writeFile(imagePath, buffer);
            imgUrl = `/${timestamp}_${image.name}`;
        }

        
        
        const blogData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: imgUrl,
            content: formData.get("content"),
            tags: formData.get("tags"),
            authorEmail: formData.get("authorEmail") || 'anonymous', // Ajout de l'email de l'auteur
            date: new Date(), // Ajout de la date de création
        };

        await BlogModel.create(blogData);
        console.log("Blog post créé avec succès");

        return NextResponse.json({ success: true, msg: "Blog créé" });
    } catch (error) {
        console.error("Erreur lors de la création du blog:", error);
        return NextResponse.json({ error: "Erreur lors de la création du blog" }, { status: 500 });
    }
}

// Endpoint pour supprimer un blog
export async function DELETE(request) {
    await LoadDB(); // Assurez-vous que la DB est connectée avant d'exécuter la requête

    try {
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID du blog requis" }, { status: 400 });
        }

        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({ error: "Blog non trouvé" }, { status: 404 });
        }

        // Suppression de l'image si elle existe
        if (blog.image) {
            const imagePath = `public/${blog.image}`;
            try {
                await unlink(imagePath); // Utilisez `unlink` pour supprimer le fichier
            } catch (err) {
                console.error('Erreur lors de la suppression de l\'image:', err);
                // Retourner une réponse partielle si l'image ne peut pas être supprimée
                return NextResponse.json({ success: true, msg: "Blog supprimé, mais erreur lors de la suppression de l'image" });
            }
        }

        // Suppression du blog de la base de données
        await BlogModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, msg: "Blog supprimé" });
    } catch (error) {
        console.error("Erreur lors de la suppression du blog:", error);
        return NextResponse.json({ error: "Erreur lors de la suppression du blog" }, { status: 500 });
    }
}
