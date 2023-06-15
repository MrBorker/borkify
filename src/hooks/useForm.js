import { useState } from "react";

function useForm() {
  const [name, setName] = useState();

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };

  return;
}
