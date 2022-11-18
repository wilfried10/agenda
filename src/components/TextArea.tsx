import React, { useState } from 'react'
import { TextAreaProps } from '../data/props';


const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ children, ...props }, ref) => {
    const [passwordVisible, setPassVisible] = useState<boolean>(false);

    return (
        <div className="mt-4 mb-2">
            <label htmlFor={props.name} className="block text-gray-600  -5">
                {children}
            </label>

            <div className="flex justify-center items-center space-x-4 ">
                <textarea id="message" rows={4} ref={ref} {...props} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
            </div></div>
    )
})

export default TextArea