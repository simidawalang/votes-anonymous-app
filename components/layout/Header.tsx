import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <nav>
      <Link href="/">
        <span className="nav-brand">VotesAnon </span>
      </Link>
      <ul>
        <Link href="/">Home</Link>
        <Link href="/poll">View Polls</Link>
        <Link href="/poll/new">Create Poll</Link>
        <Link href="/donate">Donate to Creator</Link>
      </ul>
    </nav>
  );
};

export default Header;
