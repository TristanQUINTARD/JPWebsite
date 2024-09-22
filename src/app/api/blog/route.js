
import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
import { auth } from "@/src/auth";

const LoadDB = async () => {
    await ConnectDB();
};

export async function GET(request) {
    await LoadDB();

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
    await LoadDB();

    try {
        // Récupérer la session de l'utilisateur
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

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
            name: session.user.name,
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: imgUrl,
            content: formData.get("content"),
            tags: formData.get("tags"),
            authorEmail: session.user.email,
            date: new Date(),
        };

        // Vérification des champs requis
        const requiredFields = ['title', 'content'];
        for (const field of requiredFields) {
            if (!blogData[field]) {
                return NextResponse.json({ error: `Le champ ${field} est requis` }, { status: 400 });
            }
        }

        const newBlog = await BlogModel.create(blogData);
        console.log("Blog post créé avec succès:", newBlog);

        return NextResponse.json({ success: true, msg: "Blog créé", blog: newBlog });
    } catch (error) {
        console.error("Erreur lors de la création du blog:", error);
        return NextResponse.json({ error: "Erreur lors de la création du blog" }, { status: 500 });
    }
}

export async function DELETE(request) {
    await LoadDB();

    try {
        // Vérifier l'authentification de l'utilisateur
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID du blog requis" }, { status: 400 });
        }

        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({ error: "Blog non trouvé" }, { status: 404 });
        }

        // Vérifier si l'utilisateur est l'auteur du blog (optionnel, selon vos besoins)
        if (blog.authorEmail !== session.user.email) {
            return NextResponse.json({ error: "Non autorisé à supprimer ce blog" }, { status: 403 });
        }

        // Suppression de l'image si elle existe
        if (blog.image) {
            const imagePath = `public/${blog.image}`;
            try {
                await unlink(imagePath);
            } catch (err) {
                console.error('Erreur lors de la suppression de l\'image:', err);
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
