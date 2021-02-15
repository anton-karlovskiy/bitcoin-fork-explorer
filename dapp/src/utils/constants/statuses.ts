
// test touch <
interface Statuses {
  IDLE: string;
  PENDING: string;
  RESOLVED: string;
  REJECTED: string;
}

// TODO: should rename `STATUSES` `FETCHING_STATUSES`
const STATUSES: Statuses = Object.freeze({
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
});

export default STATUSES;
// test touch >
