interface CampoFormularioProps {
  id: string;
  label: string;
  value: string;
  error?: string;
    errorClassName?: string;
  type?: "text" | "number";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | string;
  maxLength?: number;
  onChange: (value: string) => void;
}

export default function CampoFormulario({
  id,
  label,
  value,
  error,
  errorClassName,
  type = "text",
  placeholder,
  min,
  max,
  step,
  maxLength,
  onChange,
}: CampoFormularioProps) {
    
  return (
    
    <div>
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        onChange={(event) =>
          onChange(event.target.value)
        }
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${id}-error` : undefined
        }
      />
      

      {error && (
  <p
    id={`${id}-error`}
    className={errorClassName}
  >
    ⚠ {error}
  </p>
)}
    </div>
  );
}