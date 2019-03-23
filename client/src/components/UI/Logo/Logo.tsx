import * as React from 'react';
import { Logo } from '../Icons/Icons';
interface LogoProps {
  style: object;
}

const logo: React.StatelessComponent<LogoProps> = props => {
  console.log(<Logo />);
  return (
    <>
      <Logo style={{ width: 90, height: 90 }} /> <h3>Meal Planner</h3>
    </>
  );
};

export default logo;
