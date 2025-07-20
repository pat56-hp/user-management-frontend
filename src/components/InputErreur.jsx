export default function InputError({ message, className = "", ...props }) {
  return message ? (
    <p {...props} className={"text-xs pl-1 pt-1 text-red-600 " + className}>
      {message}
    </p>
  ) : null;
}
