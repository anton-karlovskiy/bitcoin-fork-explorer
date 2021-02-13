
// TODO: should not use `react-bootstrap` due to an overhead
import { Container as BootStrapContainer } from 'react-bootstrap';

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => (
  <BootStrapContainer>
    {children}
  </BootStrapContainer>
);

export default Container;
