export default function TailwindInput({
  label = "label",
  type = "text",
  placeholder = "placeholder",
  name = "name",
  defaultValue = "",
  disabledField = false,
  ...props
}) {
  return (
    <div
      style={{
        pointerEvents: disabledField ? "none" : "auto",
        opacity: disabledField ? 0.75 : 1,
      }}
      className="flex flex-col justify-center items-start gap-2 bg-[#f4ff8f] p-3 rounded-xl"
    >
      <label
        htmlFor={label}
        className="text-left text-sm font-medium px-2 pt-1"
      >
        {label}
        {disabledField && (
          <span className="text-xs text-primary ml-2">(comming soon)</span>
        )}
      </label>
      <div className="relative w-full flex bg-[#e5f175] rounded-lg p-1">
        {defaultValue.length > 3 && (
          <div className="pointer-events-none left-0 text-sm flex items-center px-3">
            <span className="text-primary">{defaultValue}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          {...props}
          className="bg-[#ecf976] placeholder:text-primary px-4 py-2.5 border-none outline-none focus:outline-none focus:ring-2 focus:ring-white/25 duration-150 w-full pr-12 text-sm rounded-lg"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
