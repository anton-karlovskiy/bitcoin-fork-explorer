
import Container from 'parts/Container';
import AppBar from 'parts/AppBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <Container>
    <AppBar />
    {children}
  </Container>
);

export default Layout;
