
import {
  Link,
  LinkProps
} from 'react-router-dom';

import Button from 'components/UI/Button';

interface Props {
  linkProps: LinkProps,
  buttonProps?: {},
  children: React.ReactNode
}

const LinkButton = ({
  linkProps,
  buttonProps,
  children
}: Props) => (
  <Link {...linkProps}>
    <Button {...buttonProps}>
      {children}
    </Button>
  </Link>
);

export default LinkButton;
