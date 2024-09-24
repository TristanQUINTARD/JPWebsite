import React from 'react';
import { BookOpen, Users, History, Gavel, Brain } from 'lucide-react';

interface Book {
  title: string;
  author: string;
  year: number;
}

interface BookSection {
  title: string;
  icon: React.ReactNode;
  books: Book[];
}

const BibliographiePage: React.FC = () => {
  const bookSections: BookSection[] = [
    {
      title: "Problématique sociale française",
      icon: <Users className="w-6 h-6 text-primary-color" />,
      books: [
        { title: "La France sous nos yeux", author: "Jérôme Fourquet", year: 2021 },
        { title: "Le grand repli", author: "Nicolas Bancel", year: 2015 },
        { title: "La Fracture", author: "Gilles Kepel", year: 2016 },
      ]
    },
    {
      title: "Histoire",
      icon: <History className="w-6 h-6 text-primary-color" />,
      books: [
        { title: "Une histoire mondiale de la France", author: "Patrick Boucheron", year: 2017 },
        { title: "Métronome 2", author: "Lorànt Deutsch", year: 2016 },
        { title: "Les Pourquoi de l'Histoire", author: "Stéphane Bern", year: 2019 },
      ]
    },
    {
      title: "Politique intérieure française",
      icon: <Gavel className="w-6 h-6 text-primary-color" />,
      books: [
        { title: "Le temps des tempêtes", author: "Nicolas Sarkozy", year: 2020 },
        { title: "Révolution", author: "Emmanuel Macron", year: 2016 },
        { title: "Là où le sort nous emporte", author: "François Hollande", year: 2022 },
      ]
    },
    {
      title: "Philosophie",
      icon: <Brain className="w-6 h-6 text-primary-color" />,
      books: [
        { title: "La consolation de la philosophie", author: "Boèce", year: 2018 },
        { title: "Le Miracle Spinoza", author: "Frédéric Lenoir", year: 2017 },
        { title: "Éloge de la faiblesse", author: "Alexandre Jollien", year: 2011 },
      ]
    },
  ];

  return (
    <div className="notepad max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary-color">Bibliographie</h1>
      <p className="mb-8 text-center">
        Une sélection de lectures contemporaines sur des sujets clés de la société française.
      </p>
      
      {bookSections.map((section, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-primary-color">
            {section.icon}
            {section.title}
          </h2>
          <ul className="space-y-4">
            {section.books.map((book, bookIndex) => (
              <li key={bookIndex} className="flex items-start gap-2">
                <BookOpen className="w-5 h-5 mt-1 text-secondary-color" />
                <div>
                  <span className="font-medium">{book.title}</span> par {book.author} ({book.year})
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BibliographiePage;