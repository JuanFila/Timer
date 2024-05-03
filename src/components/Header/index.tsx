import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./style";
import {  Hourglass, Scroll, Timer } from "phosphor-react";

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <Hourglass color='#00875F' />
      </span>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer />
        </NavLink>
        <NavLink to="history" title="History">
          <Scroll />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
