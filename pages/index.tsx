import { useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent } from "react";

const Home: NextPage = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const proposalRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const proposalValue = proposalRef.current?.value;
    const nameValue = nameRef.current?.value;
  };
  return (
    <div className="">
      <Head>
        <title>Votes Anonymous</title>
        <meta name="description" content="An anonymous voting game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>
        You don't get to see the winners or their addresses until voting is
        over.
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef}/>
        <input type="text" ref={proposalRef} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Home;
