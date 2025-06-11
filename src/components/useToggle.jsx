import React from 'react';
import { useState } from 'react';

const useToggle  = (defaultVal) => {

  const [value, setValue] = useState(defaultVal);

  function toogleValue(val) {
    if(typeof val!='boolean'){
      setValue(!value);
    }
    else{
      setValue(val);
    }
  }
   return [value,toogleValue];
};

export default useToggle ;