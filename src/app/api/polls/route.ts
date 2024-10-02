import { NextResponse } from 'next/server';
import { ConnectDB } from "@/lib/config/db";
import PollModel from '@/lib/models/PollModel';

export async function GET() {
  await ConnectDB();
  console.log("Connexion à la base de données établie");

  try {
    const latestPoll = await PollModel.findOne().sort({ createdAt: -1 });
    console.log("Résultat de la requête:", latestPoll);

    if (!latestPoll) {
      console.log("Aucun sondage trouvé");
      return NextResponse.json({ error: 'Aucun sondage trouvé.' }, { status: 404 });
    }

    console.log("Sondage trouvé:", latestPoll.googleFormLink);
    return NextResponse.json({ googleFormLink: latestPoll.googleFormLink }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération du sondage:', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la récupération du sondage.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await ConnectDB();

  try {
    const body = await request.json();
    const { googleFormLink } = body;

    if (!googleFormLink || typeof googleFormLink !== 'string') {
      return NextResponse.json({ error: 'Le lien du formulaire Google est requis et doit être une chaîne de caractères.' }, { status: 400 });
    }

    const newPoll = new PollModel({ googleFormLink });
    await newPoll.save();

    return NextResponse.json({ success: true, message: 'Sondage créé avec succès.' }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du sondage:', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la création du sondage.' }, { status: 500 });
  }
}