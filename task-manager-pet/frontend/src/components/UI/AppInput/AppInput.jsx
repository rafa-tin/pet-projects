export function AppInput({ id, children, error, ...props }) {
  return (
    <div className="form-group mb-3">
      <label htmlFor={id}>{children}</label>
      <input
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
