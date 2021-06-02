import React from "react";

import { InputGroup, Button, FormControl } from "react-bootstrap";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Input = ({
  name,
  type,
  placeholder,
  handleChange,
  handleShowPassword,
}) => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
      {name === "password" && (
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleShowPassword}>
            {type === "password" ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </Button>
        </InputGroup.Append>
      )}
    </InputGroup>
  );
};

export default Input;
