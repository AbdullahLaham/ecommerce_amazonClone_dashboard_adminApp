import React from 'react'

const CustomInput = ({label, i_id, type, style}) => {

    return (
    <div>
        <input placeholder={label} id={i_id} type={type} className={`py-2 px-2 rounded-md border outline-none border-gray-400 text-gray-600 w-[23rem] ${style}`} />
    </div>
  )
}

export default CustomInput