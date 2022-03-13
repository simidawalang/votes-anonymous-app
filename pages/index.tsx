import React, {
  MouseEvent,
  useRef,
  useState,
  FormEvent,
  useEffect,
} from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
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
  const [connected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  

  return (
    <div className="home-page">
      <Head>
        <title>Votes Anonymous</title>
        <meta name="description" content="An anonymous voting game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>
        You don't get to see the winners or their addresses until voting is
        over.
      </p>

      <Button onClick={connectWallet} color={`${connected ? 'green' : 'blue'}`}>
        {connected ? "Wallet Connected" : isLoading ? "Loading" : "Connect"}
      </Button>
      <Link href="/compete">Create Poll</Link>
    </div>
  );
};

export default Home;
