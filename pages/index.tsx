import React, { MouseEvent, useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import Image from "next/image";
import amongUs from "../public/images/among-us-crew.png";
import RightArrow from "../public/icons/right-arrow";
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
        <header>
          <div className="home-page-header-div">
            <h1>
              <motion.span>Think AmongUs...</motion.span>
              <motion.span>but for voting.</motion.span>
            </h1>
            <p>
              A fun dApp for taking polls.
            </p>
            <div className="actions">
              <Button
                onClick={connectWallet}
                color={`${connected ? "green" : "blue"}`}
                size="big"
              >
                {connected
                  ? "Wallet Connected"
                  : isLoading
                  ? "Loading"
                  : "Connect"}
              </Button>
              <span className="span-link">
                <Link href="/poll/new">Create Poll</Link>
                <RightArrow />
              </span>
            </div>
          </div>
          <div className="home-page-header-div">
            <Image src={amongUs} />
          </div>
        </header>
    </div>
  );
};

export default Home;
