import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({
    name,
    control,
    lebel,
    defaultValue = "",
    className = "",
    ...props
}) {
  return (
    <div className={`w-full flex flex-col mb-4 ${className}`}>
        {lebel && (
            <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
                {lebel}
            </label>
        )}
        <Controller
            name={name || "content"}
            control={control}
            defaultValue={defaultValue}
            render={({ field:{onChange} }) => (
                <Editor
                    id={name}
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    value={field.value}
                    init={{
                        height: 300,
                        menubar: true,
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount"
                        ],
                        toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"    
                    }}
                    onEditorChange={onChange}
                    {...props}
                />
            )}
        />
    </div>  
    );
}

export default RTE;