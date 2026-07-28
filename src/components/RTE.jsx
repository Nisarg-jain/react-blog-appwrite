import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {/* 1. Added curly brace wrapper for conditional label rendering */}
      {label && <label className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        /* 2. Fixed destructuring syntax and used render's field props correctly */
        render={({ field: { onChange, value } }) => (
          <Editor
            /* 3. TinyMCE uses initialValue + onEditorChange instead of standard {...field} */
            initialValue={defaultValue}
            value={value}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            /* 4. Connects TinyMCE's change listener directly to React Hook Form */
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}