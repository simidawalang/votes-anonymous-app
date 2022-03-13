import React, { ReactNode } from 'react';
import Header from './Header';

interface PropTypes {
    children: ReactNode
}
const Layout = ({children}: PropTypes) => {
    return (
        <>
        <Header />
            {children}
        </>
    );
};

export default Layout;