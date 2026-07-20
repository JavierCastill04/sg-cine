interface SelectFormularioProps {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  error?: string;
  errorClassName?: string;
  onChange: (value: string) => void;
}

export default function SelectFormulario({
  id,
  label,
  value,
  options,
  placeholder,
  error,
  errorClassName,
  onChange,
}: SelectFormularioProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <select
        id={id}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        aria-invalid={Boolean(error)}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <p className={errorClassName}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}