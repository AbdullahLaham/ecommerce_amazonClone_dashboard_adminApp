import React from 'react'

const CustomInput = ({label, i_id, type, style, handleChange, name, value}) => {


    return <input placeholder={label} id={i_id} name={name} type={type} onChange={handleChange} value={value} className={`mb-2 py-2 px-2 rounded-md border outline-none border-gray-400 text-gray-600 w-[100%] ${style} `} />
  
}

export default CustomInput ;