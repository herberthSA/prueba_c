import React, { useState } from 'react';

const Formulario = () => {
  const [image, setImage] = useState(null);
  const [subject, setSubject] = useState(''); // Estado para el asunto

  // Manejador de cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejador de cambio del asunto
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.querySelector('#image');

    if (fileInput.files.length > 0) {
      formData.append('image', fileInput.files[0]);
    }
    
    formData.append('subject', subject); // Añadir el asunto al FormData

    try {
      const response = await fetch('TU_ENDPOINT_AQUI', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Imagen y asunto enviados con éxito');
      } else {
        alert('Error al enviar la imagen y el asunto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la imagen y el asunto');
    }
  };

  return (
    <form id="form" className="topBefore" onSubmit={handleSubmit}>
      <label htmlFor="name">Asunto:</label>
      <input
        id="name"
        type="text"
        placeholder="Asunto"
        value={subject}
        onChange={handleSubjectChange}
      />
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {image && (
        <div className="image-preview">
          <img src={image} alt="Preview" />
        </div>
      )}
      <input id="submit" type="submit" value="GO!" />
    </form>
  );
};

export default Formulario;
