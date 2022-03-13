import React, { FormEvent, useRef } from "react";
import { motion } from "framer-motion";
import Button from "../../components/Button";

const EnterContest = () => {
  const pollTitleRef = useRef<HTMLInputElement | null>(null);
  const noOfParticipantsRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const pollTitle = pollTitleRef.current?.value;
    const noOfParticipants = noOfParticipantsRef.current?.value;
  };
  return (
    <div className="compete-page">
        Poll id
    </div>
  );
};

export default EnterContest;
