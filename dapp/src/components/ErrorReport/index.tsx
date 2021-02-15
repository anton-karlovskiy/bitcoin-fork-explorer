
import styles from './error-report.module.css';

interface Props {
  error: Error | undefined
}

// TODO: could be polished
const ErrorReport = ({ error }: Props) => (
  <div className={styles['error-report']}>{error?.message}</div>
);

export default ErrorReport;
