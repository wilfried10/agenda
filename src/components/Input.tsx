import React, { forwardRef, useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { InputProps } from "../data/props";




const Input = React.forwardRef<HTMLInputElement, InputProps>(({ children, ...props }, ref) => {
  const [passwordVisible, setPassVisible] = useState<boolean>(false);

  return (
    <>
      <div className="mt-4 mb-2">
        <label htmlFor={props.name} className="block text-gray-600  -5">
          {children}
        </label>

        <div className="flex justify-center items-center space-x-4 ">
          <input
            className={(props.type === "date" || props.type === "time") ? " text-red block font-medium bg-white  border border-slate-300 rounded-md py-1 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" : " text-red block min-w-[30vw] font-medium bg-white  border border-slate-300 rounded-md py-1 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"}
            ref={ref} {...props} type={passwordVisible ? "text" : props.type} />

          {props.type == "password" && <div onClick={() => setPassVisible((s) => !s)}>

            {passwordVisible ? (
              <EyeFill size={18} />
            ) : (
              <EyeSlashFill size={18} />
            )}
          </div>} </div></div> </>

  )
})

export default Input;












