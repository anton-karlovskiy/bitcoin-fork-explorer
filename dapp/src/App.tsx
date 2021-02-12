
import React from 'react';
import {
  Col,
  Container,
  Row,
  Table,
  Button
} from 'react-bootstrap';
import { RelayLib } from 'relay';

import './_general.scss';

function App() {
  // TODO: read the chain elements from the lib (smart contract)
  // TODO: display the different block headers/forks

  React.useEffect(() => {
    (async () => {
      const relay = new RelayLib();
      await relay.init();

      try {
        const id = await relay.getMaxChainId();
        console.log(id);
      } catch {
        console.error(
          'Failed to connect to contract! Please make sure your local hardhat node is running, and Metamask is connected to your localhost RPC (RPC URL: \'http://localhost:8545\', chain ID: \'31337\').'
        );
      }
    })();
  }, []);

  return (
    <Container>
      <Container fluid>
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <h1>Bitcoin Fork Explorer</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Chain</th>
              <th>Current height</th>
              <th>Start height</th>
              <th>Best block hash</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Main</td>
              <td>1896819</td>
              <td>1732322</td>
              <td>
                00000000294f816121e3f5852b9dea772c590b5ffaa1cfd79be46499879065f2
              </td>
              <td>
                <Button variant='primary'>Explore</Button>
              </td>
            </tr>
            <tr>
              <td>Fork 1</td>
              <td>1894344</td>
              <td>1894322</td>
              <td>
                000000002db48f25d7a79bc6b7d45d70d77e2ebf13aa79e025dd013be2556cce
              </td>
              <td>
                <Button variant='primary'>Explore</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}

export default App;
