
interface Props {
  error: Error | undefined
}

// TODO: could be polished
const ErrorReport = ({ error }: Props) => (
  <div>{error?.message}</div>
);

export default ErrorReport;
