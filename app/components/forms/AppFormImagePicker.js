import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import ImageInputList from '../ImageInputList';

function AppFormImagePicker({ name, maxImageCount }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = uri => {
    setFieldValue(name, [...imageUris, uri])
    console.log("==== imageUris ====");
    console.log(imageUris.length);
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
      />
      <ErrorMessage error={errors[name]} visible={touched[name]}/>
    </>
  );
}

export default AppFormImagePicker;