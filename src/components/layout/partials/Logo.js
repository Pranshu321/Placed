import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <Link to="/">
        <h1 className="m-0">
          <Image
            src={require('./../../../assets/images/logo.svg')}
            alt="Open"
            width={23}
            height={23} />
        </h1>
        <span style={{ color: 'white', fontWeight: "bolder" }}>Placed</span>
      </Link>
    </div>
  );
}

export default Logo;