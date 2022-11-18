import React, { PropsWithChildren, useState } from "react";
import { SpinnerCircular } from "spinners-react/lib/esm/SpinnerCircular";

type PrimaryButton = PropsWithChildren<{
  isLoading?: boolean;
  isForm?: boolean;
  isError?: boolean;
  className?: string | undefined,
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}>;

function ButtonSubmit({ isLoading = false, isForm = false, onClick = undefined, isError = false, className, disabled = false, children }: PrimaryButton) {
  return (
    <div   >
      <button
        type="submit"
        onClick={isForm || disabled ? undefined : onClick}
        className={disabled ? "rounded - lg bg-gray-100 hover:bg-gray-500 px-10 py-2 text-white" : isError ? " rounded-lg bg-blue-900 hover:bg-blue-500 	 px-10 py-2 text-white " + className : " rounded-lg bg-red-900 hover:bg-red-500 	 px-10 py-2 text-white " + className} >
        <div className="flex flex-1 justify-center items-center" > <SpinnerCircular enabled={isLoading} secondaryColor="transparent" thickness={200} speed={150} size={14} color={"#FFFF"} className="mr-3" /> {children} </div>
      </button>
    </div>
  );
}

export default ButtonSubmit;
