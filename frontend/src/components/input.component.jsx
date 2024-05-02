import React, { useState } from 'react'

const InputBox = ({name, type, placeholder, defaultValue, id, icon}) => {

    const [visiblePwd, setVisiblePwd] = useState(false);
  return (
    <div className='relative w-[100%] mb-4'>
        <input
        name={name}
        type={type == "password" ? visiblePwd ? "text" : "password" : type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={id}
        className='input-box' />
        
        <i class={"fi " + icon + " input-icon"}></i>

        {
            type == "password" ?
            <i class={"fi fi-rr-eye" + (!visiblePwd ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"}
            onClick={() => setVisiblePwd(defaultVal => !defaultVal)}></i>
            : ""
        }

    </div>
  )
}

export default InputBox;