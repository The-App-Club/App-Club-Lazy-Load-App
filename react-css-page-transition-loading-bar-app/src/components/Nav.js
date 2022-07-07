import {Link} from 'react-router-dom';
import styled from '@emotion/styled';

const StyledNav = styled.div`
  width: 100%;
`;
const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & li {
    &:hover {
      background: bisque;
    }
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <StyledList>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/about'}>About</Link>
        </li>
        <li>
          <Link to={'/profile'}>Profile</Link>
        </li>
      </StyledList>
    </StyledNav>
  );
};

export {Nav};
