
import Container from 'parts/Container';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <Container>
    {children}
  </Container>
);

export default Layout;
