"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import Image from "next/image";
import axios from "axios";
import { assets } from "../../Assets/assets"
import dynamic from 'next/dynamic';
import "./page.css";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RichTextEditor = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
  });
  const [editorContent, setEditorContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    const savedDraftsData = localStorage.getItem('savedDrafts');
    if (savedDraftsData) {
      setSavedDrafts(JSON.parse(savedDraftsData));
    }
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const insertTable = () => {
    const rows = prompt('Nombre de lignes?');
    const cols = prompt('Nombre de colonnes?');
    let table = '<table border="1" style="border-collapse: collapse;">';
    for (let i = 0; i < rows; i++) {
      table += '<tr>';
      for (let j = 0; j < cols; j++) {
        table += '<td style="border: 1px solid black; padding: 8px;">Contenu</td>';
      }
      table += '</tr>';
    }
    table += '</table>';
    document.execCommand('insertHTML', false, table);
  };

  const insertChart = useCallback(() => {
    const chartOptions = {
      chart: { type: 'bar', height: 350 },
      series: [{ data: [30, 40, 45, 50, 49, 60, 70, 91, 125] }],
      xaxis: { categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep'] }
    };
    const chartDiv = document.createElement('div');
    chartDiv.id = `chart-${Date.now()}`;
    editorRef.current.appendChild(chartDiv);
    
    const chart = new ApexCharts(chartDiv, chartOptions);
    chart.render();
  }, []);

  const insertHeading = (level) => {
    document.execCommand('formatBlock', false, `h${level}`);
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const updateWordCount = () => {
    const text = editorRef.current.innerText;
    setWordCount(text.trim().split(/\s+/).length);
  };

  const saveDraft = () => {
    const newDraft = {
      id: Date.now(),
      title: data.title,
      content: editorContent,
      date: new Date().toLocaleString()
    };
    const updatedDrafts = [...savedDrafts, newDraft];
    setSavedDrafts(updatedDrafts);
    localStorage.setItem('savedDrafts', JSON.stringify(updatedDrafts));
    toast.success("Brouillon sauvegardé");
  };

  const loadDraft = (draft) => {
    setData(prevData => ({ ...prevData, title: draft.title }));
    setEditorContent(draft.content);
    editorRef.current.innerHTML = draft.content;
    toast.info("Brouillon chargé");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("content", editorRef.current.innerHTML);
    formData.append("tags", JSON.stringify(tags));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",   
        });
        setEditorContent('');
        setTags([]);
      } else {
        toast.error("Erreur lors de l'ajout du blog");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la requête");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Éditeur d'articles</h1>
      
      <div className="mb-6">
        <p className="text-xl font-semibold mb-2">Upload une illustration</p>
        <label htmlFor="image" className="block cursor-pointer">
          <Image className="mt-4 rounded-md border border-gray-200 shadow-sm" src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="upload_icon" width={140} height={70} />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold mb-2">Titre de l'article</p>
        <input 
          name="title" 
          onChange={onChangeHandler} 
          value={data.title} 
          className="form-input w-full" 
          type="text" 
          placeholder="Écrivez un titre accrocheur" 
          required 
        />
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold mb-2">Résumé</p>
        <textarea 
          name="description" 
          onChange={onChangeHandler} 
          value={data.description} 
          className="form-input w-full" 
          placeholder="Résumez votre article en quelques phrases" 
          rows={3} 
          required 
        />
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold mb-2">Contenu de l'article</p>
        <div className="form-format-buttons flex flex-wrap gap-2 mb-2">
          <button type="button" onClick={() => handleFormat('bold')} className="format-btn">Gras</button>
          <button type="button" onClick={() => handleFormat('italic')} className="format-btn">Italique</button>
          <button type="button" onClick={() => handleFormat('underline')} className="format-btn">Souligné</button>
          <button type="button" onClick={() => handleFormat('insertOrderedList')} className="format-btn">Liste ordonnée</button>
          <button type="button" onClick={() => handleFormat('insertUnorderedList')} className="format-btn">Liste à puces</button>
          <button type="button" onClick={() => insertHeading(2)} className="format-btn">Titre 2</button>
          <button type="button" onClick={() => insertHeading(3)} className="format-btn">Titre 3</button>
          <button type="button" onClick={insertTable} className="format-btn">Insérer un tableau</button>
          <button type="button" onClick={insertChart} className="format-btn">Insérer un graphique</button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          className="form-editor min-h-[400px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onInput={(e) => {
            setEditorContent(e.currentTarget.innerHTML);
            updateWordCount();
          }}
        />
        <p className="text-sm text-gray-500 mt-2">Nombre de mots : {wordCount}</p>
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold mb-2">Tags</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-red-500">&times;</button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            className="form-input flex-grow"
            placeholder="Ajouter un tag"
          />
          <button type="button" onClick={addTag} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Ajouter</button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold mb-2">Catégorie</p>
        <select 
          name="category" 
          onChange={onChangeHandler} 
          value={data.category} 
          className="form-input w-full"
        >
          <option value="Technology">Technologie</option>
          <option value="Science">Science</option>
          <option value="Business">Business</option>
          <option value="Health">Santé</option>
          <option value="Lifestyle">Style de vie</option>
        </select>
      </div>

      <div className="mb-6">
        <button type="button" onClick={saveDraft} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">Sauvegarder le brouillon</button>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Publier l'article</button>
      </div>

      {savedDrafts.length > 0 && (
        <div className="mb-6">
          <p className="text-xl font-semibold mb-2">Brouillons sauvegardés</p>
          <ul className="list-disc pl-5">
            {savedDrafts.map(draft => (
              <li key={draft.id} className="mb-2">
                <span>{draft.title} - {draft.date}</span>
                <button type="button" onClick={() => loadDraft(draft)} className="ml-2 text-blue-500 underline">Charger</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default RichTextEditor;