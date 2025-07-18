interface ButtonProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const FileButton = ({
  children,
  className = "",
  disabled = false,
  onChange,
  type,
  ref,
}: ButtonProps) => {
  return (
    <article
      className={`cursor-pointer flex justify-center duration-300 items-center ${className}`}
    >
      <label
        htmlFor="file"
        className="w-full h-full flex justify-center items-center"
      >
        {children}
        <input
          className="hidden"
          type="file"
          id="file"
          ref={ref}
          disabled={disabled}
          accept={type}
          onChange={onChange}
        />
      </label>
    </article>
  );
};

export default FileButton;
