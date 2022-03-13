import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <nav>
            <Link href="/"><span className="nav-brand">VotesAnon </span></Link>
            <Link href="/compete">Create Contest</Link>
        </nav>
    );
};

export default Header;