interface InputProps {
  label: string;
  customerName: string;
  setCustomerName: (name: string) => void;
  type: string;
  styles: {
    formGroup: string;
    label: string;
    input: string;
  };
}

function Input({
  label,
  customerName,
  setCustomerName,
  type,
  styles,
}: InputProps) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        {label}
        <input
          type={type}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className={styles.input}
          required
        />
      </label>
    </div>
  );
}

export default Input;
