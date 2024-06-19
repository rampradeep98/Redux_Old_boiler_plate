import React from 'react';
import Select from 'react-select';

const SelectInput = ({
  label,
  options,
  handleChange,
  name,
  placeholder,
  noOptionsMessage,
  selectedValue,
  formDatas,
  formData,
}) => {
  const noOptionsText = true;
  // console.log('options', options)
  return (
    <>
      <div className='auth-form-group'>
        <span className='label'>{label}</span>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: 48,
              marginTop: 4,
            }),
          }}
          options={options}
          placeholder={placeholder}
          required
          onChange={handleChange}
          name={name}
          value={formData[name]}
          noOptionsMessage={({ inputValue }) =>
            inputValue ? noOptionsText : noOptionsMessage
          }
          selectedValue={formData[name]}
        />
      </div>
    </>
  );
};

export default SelectInput;
