import Logo from '../../assets/logo.png';
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
    openForm: () => void;
}

export const NavBar = ({openForm}: Props) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
            <img src={Logo} alt="logo" style={{ marginRight: "10px" }} />
            Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
            <Button onClick={openForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
    );
}