
import Tree from 'react-d3-tree';

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production'
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication'
          },
          children: [
            {
              name: 'Worker'
            }
          ]
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly'
          },
          children: [
            {
              name: 'Worker'
            }
          ]
        }
      ]
    }
  ]
};

const BlocksTree = () => {
  return (
    <div
      id='treeWrapper'
      style={{
        height: 600
      }}>
      <Tree data={orgChart} />
    </div>
  );
};

export default BlocksTree;
