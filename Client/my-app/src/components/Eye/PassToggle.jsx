import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const PassToggle = ({ visible, onClick}) => {
  return (
    <>
    <button onClick={onClick} className='text-xl outline-none'>
        { visible ? <AiOutlineEyeInvisible/> : <AiOutlineEye/> }
    </button>
    </>
  )
}

export default PassToggle;