import React from 'react';
import Select from 'react-select';
import { MultiSelect } from 'react-multi-select-component';

const SelectMulti = ({ label, options, handleChange, value }) => {
  //const [multiProduct, setMultiProduct] = useState([]);
  return (
    <>
      <div className="auth-form-group">
        <span className="label">{label}</span>
        <div className="w-100">
          <MultiSelect
            onChange={handleChange}
            options={options}
            isMulti
            required
            value={value}
            labelledBy="Select"
          />
        </div>
      </div>
    </>
  );
};

export default SelectMulti;
