import React, { useState } from 'react';
import { useDispatch } from '../../services/store';
import { addProduct } from '../../services/product/slice';
import { Product } from '../../utils/types';
import style from './create-product-form.module.scss';
import { v4 as uuidv4 } from 'uuid';

const CreateProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !image.trim()) {
      setError('All fields are required');
      return;
    }

    const newProduct: Product = {
      id: uuidv4(),
      title,
      description,
      image,
      liked: false,
    };

    dispatch(addProduct(newProduct));
    setTitle('');
    setDescription('');
    setImage('');
    setError('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      {error && <div className={style.error}>{error}</div>}
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
