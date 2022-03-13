import React, {
  MouseEvent,
  useRef,
  useState,
  FormEvent,
  useEffect,
} from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface PropType {
  children: any;
  p1: string;
  accounts: string[];
}

const Home: NextPage<PropType> = ({ p1 }) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const proposalRef = useRef<HTMLInputElement | null>(null);
  const [connected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  let accounts;
  useEffect(() => {
    const checkIfAccountConnected = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      accounts = await provider.listAccounts();

      accounts.length > 0 && setIsConnected(true);
    };
    checkIfAccountConnected();
  }, []);

  const connectWallet = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (window.ethereum) {
        setIsLoading(true);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsLoading(false);
        setIsConnected(true);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

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

      <button onClick={connectWallet}>
        {connected ? "Wallet Connected" : isLoading ? "Loading" : "Connect"}
      </button>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} />
        <input type="text" ref={proposalRef} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Home;
