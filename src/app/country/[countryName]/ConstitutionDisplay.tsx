import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Article {
  id: number;
  chapter_id: number;
  number: string;
  content: string;
}

interface ConstitutionDisplayProps {
  constitution: Article[];
  onUpdateArticle: (updatedArticle: Article) => void;
}

const ConstitutionDisplay: React.FC<ConstitutionDisplayProps> = ({ constitution, onUpdateArticle }) => {
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters = constitution?.reduce((acc, article) => {
    if (!acc[article.chapter_id]) {
      acc[article.chapter_id] = [];
    }
    acc[article.chapter_id].push(article);
    return acc;
  }, {} as Record<number, Article[]>) ?? {};

  const toggleChapter = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const startEditing = (article: Article) => {
    setEditingArticleId(article.id);
    setEditContent(article.content);
  };

  const saveEdit = (article: Article) => {
    onUpdateArticle({ ...article, content: editContent });
    setEditingArticleId(null);
  };

  return (
    <div className="constitution-display">
      <h2 className="constitution-title">Constitution</h2>
      <div className="constitution-accordion">
        {Object.entries(chapters).map(([chapterId, articles]) => (
          <div key={chapterId} className="accordion-item">
            <button
              className={`accordion-header ${openChapter === Number(chapterId) ? 'active' : ''}`}
              onClick={() => toggleChapter(Number(chapterId))}
            >
              Chapitre {chapterId}
            </button>
            <AnimatePresence>
              {openChapter === Number(chapterId) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="accordion-content"
                >
                  <div className="scrollable-content">
                    {articles.map((article) => (
                      <div key={article.id} className="article">
                        <h4 className="article-number">{article.number}</h4>
                        {editingArticleId === article.id ? (
                          <div className="editContainer">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="editTextarea"
                            />
                            <div className="editButtons">
                              <button onClick={() => saveEdit(article)} className="saveButton">
                                Sauvegarder
                              </button>
                              <button onClick={() => setEditingArticle(null)} className="cancelButton">
                                Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="article-content">{article.content}</p>
                            <button onClick={() => startEditing(article)} className="editButton">
                              Modifier
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstitutionDisplay;