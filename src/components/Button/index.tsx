import './index.css';

interface ButtonProps {
  label: string;
  operation?: boolean;
  double?: boolean;
  triple?: boolean
  click: (fn: Function) => string | number | void;
}

export function Button({ label, operation, double, triple, click }: ButtonProps) {

  return (
    <button
      className={`button
      ${operation ? 'operation' : ''}
      ${double ? 'double' : ''}
      ${triple ? 'triple' : ''}
      `}
      onClick={() => click && click(() => label)}
    >
      {label}
    </button>
  );
};