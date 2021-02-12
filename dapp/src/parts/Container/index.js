
// TODO: should not use `react-bootstrap` due to an overhead
import { Container as BootStrapContainer } from 'react-bootstrap';

const Container = ({ children }) => (
  <BootStrapContainer>
    {children}
  </BootStrapContainer>
);

export default Container;
