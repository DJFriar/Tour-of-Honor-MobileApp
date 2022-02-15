import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import ImageInputList from '../ImageInputList';

function AppFormImagePicker({ name, maxImageCount, multiImageRequired }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = uri => {
    setFieldValue(name, [...imageUris, uri])
  }

  const handleRemove = uri => {
    setFieldValue(name, imageUris.filter((imageUri) => imageUri !== uri))
  };

  return (
    <>
      <ImageInputList 
        imageUris={imageUris} 
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        maxImageCount={maxImageCount}
        multiImageRequired={multiImageRequired}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]}/>
    </>
  );
}

export default AppFormImagePicker;