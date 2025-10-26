"use client"
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Patch pour React 18 - findDOMNode polyfill
if (typeof window !== 'undefined') {
  const React = require('react');
  const ReactDOM = require('react-dom');
  
  // Si findDOMNode n'existe pas, créons un polyfill
  if (!ReactDOM.findDOMNode) {
    ReactDOM.findDOMNode = function(instance) {
      if (!instance) return null;
      if (instance instanceof Element || instance instanceof Text) return instance;
      if (instance && typeof instance === 'object') {
        if ('render' in instance && typeof instance.render === 'function') {
          const rendered = instance.render();
          if (rendered) {
            return rendered;
          }
        }
      }
      return null;
    };
  }
}

const QuillEditorWrapper = dynamic(
  () => import('react-quill'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-64 bg-white rounded-md border-2 border-gray-300 flex items-center justify-center">
        <p className="text-gray-500">Chargement de l'éditeur...</p>
      </div>
    )
  }
);

export default QuillEditorWrapper;

