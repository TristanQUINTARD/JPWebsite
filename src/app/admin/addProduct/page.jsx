"use client"
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
"use client"
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import Image from "next/image";
import axios from "axios";
import { assets } from "../../Assets/assets";
import { assets } from "../../Assets/assets";
import { useSession } from "next-auth/react";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Social Issues",
    category: "Social Issues",
  });
  const [content, setContent] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const quillRef = useRef(null);
  const quillRef = useRef(null);

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

  const onEditorChange = (value) => {
    setContent(value);
    updateWordCount(value);
  const onEditorChange = (value) => {
    setContent(value);
    updateWordCount(value);
  };

  const updateWordCount = (text) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    setWordCount(plainText.trim().split(/\s+/).length);
  const updateWordCount = (text) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    setWordCount(plainText.trim().split(/\s+/).length);
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

  const saveDraft = () => {
    const newDraft = {
      id: Date.now(),
      title: data.title,
      content: content,
      content: content,
      date: new Date().toLocaleString()
    };
    const updatedDrafts = [...savedDrafts, newDraft];
    setSavedDrafts(updatedDrafts);
    localStorage.setItem('savedDrafts', JSON.stringify(updatedDrafts));
    toast.success("Brouillon sauvegardé");
  };

  const loadDraft = (draft) => {
    setData(prevData => ({ ...prevData, title: draft.title }));
    setContent(draft.content);
    setContent(draft.content);
    toast.info("Brouillon chargé");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!session?.user?.email) {
      toast.error("Erreur : informations utilisateur manquantes");
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("content", content);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));
    formData.append("authorEmail", session.user.email);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({ title: "", description: "", category: "Social Issues" });
        setContent('');
        setData({ title: "", description: "", category: "Social Issues" });
        setContent('');
        setTags([]);
      } else {
        toast.error("Erreur lors de l'ajout du blog");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la requête");
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Éditeur d'articles</h1>
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Éditeur d'articles</h1>
      
      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Upload une illustration</p>
      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Upload une illustration</p>
        <label htmlFor="image" className="block cursor-pointer">
          <Image className="mt-2 rounded-md border-2 border-gray-300 shadow-sm hover:border-blue-500 transition duration-300" src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="upload_icon" width={200} height={100} />
          <Image className="mt-2 rounded-md border-2 border-gray-300 shadow-sm hover:border-blue-500 transition duration-300" src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="upload_icon" width={200} height={100} />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
      </div>

      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Titre de l'article</p>
      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Titre de l'article</p>
        <input 
          name="title" 
          onChange={onChangeHandler} 
          value={data.title} 
          className="form-input w-full text-xl p-3 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300" 
          className="form-input w-full text-xl p-3 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300" 
          type="text" 
          placeholder="Écrivez un titre accrocheur" 
          required 
        />
      </div>

      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Résumé</p>
      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Résumé</p>
        <textarea 
          name="description" 
          onChange={onChangeHandler} 
          value={data.description} 
          className="form-textarea w-full text-lg p-3 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300" 
          className="form-textarea w-full text-lg p-3 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300" 
          placeholder="Résumez votre article en quelques phrases" 
          rows={4} 
          rows={4} 
          required 
        />
      </div>

      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Contenu de l'article</p>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={onEditorChange}
          modules={modules}
          className="bg-white rounded-md border-2 border-gray-300"
      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Contenu de l'article</p>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={onEditorChange}
          modules={modules}
          className="bg-white rounded-md border-2 border-gray-300"
        />
        <p className="text-sm text-gray-500 mt-2">Nombre de mots : {wordCount}</p>
      </div>

      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Tags</p>
        <div className="flex flex-wrap gap-2 mb-3">
      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Tags</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-red-500 hover:text-red-700">&times;</button>
              <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-red-500 hover:text-red-700">&times;</button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            className="form-input flex-grow text-lg p-2 rounded-l-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
            className="form-input flex-grow text-lg p-2 rounded-l-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
            placeholder="Ajouter un tag"
          />
          <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300">Ajouter</button>
          <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300">Ajouter</button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Catégorie</p>
      <div className="mb-8">
        <p className="text-2xl font-semibold mb-3 text-gray-700">Catégorie</p>
        <select 
          name="category" 
          onChange={onChangeHandler} 
          value={data.category} 
          className="form-select w-full text-lg p-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
          className="form-select w-full text-lg p-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
        >
          <option value="Social Issues">Problématiques Sociales</option>
          <option value="History">Histoire</option>
          <option value="Domestic Politics">Politique Intérieure</option>
          <option value="Philosophy">Philosophie</option>
          <option value="Literary Criticism">Critique Littéraire</option>
        </select>
      </div>

      <div className="mb-8 flex justify-between">
        <button type="button" onClick={saveDraft} className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300">Sauvegarder le brouillon</button>
        <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">Publier l'article</button>
      <div className="mb-8 flex justify-between">
        <button type="button" onClick={saveDraft} className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300">Sauvegarder le brouillon</button>
        <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">Publier l'article</button>
      </div>

      {savedDrafts.length > 0 && (
        <div className="mb-8">
          <p className="text-2xl font-semibold mb-3 text-gray-700">Brouillons sauvegardés</p>
          <ul className="list-disc pl-5 space-y-2">
        <div className="mb-8">
          <p className="text-2xl font-semibold mb-3 text-gray-700">Brouillons sauvegardés</p>
          <ul className="list-disc pl-5 space-y-2">
            {savedDrafts.map(draft => (
              <li key={draft.id} className="text-lg">
                <span className="text-gray-700">{draft.title} - {draft.date}</span>
                <button type="button" onClick={() => loadDraft(draft)} className="ml-3 text-blue-500 hover:text-blue-700 underline">Charger</button>
              <li key={draft.id} className="text-lg">
                <span className="text-gray-700">{draft.title} - {draft.date}</span>
                <button type="button" onClick={() => loadDraft(draft)} className="ml-3 text-blue-500 hover:text-blue-700 underline">Charger</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default RichTextEditor;