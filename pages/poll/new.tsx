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
      <motion.form onSubmit={handleSubmit} animate={{y: 100}}>
        <h3>Create Poll</h3>
        <div className="input-pair">
          <label htmlFor="name-of-contest">Title of Contest:</label>
          <input
            type="text"
            ref={pollTitleRef}
            name="name-of-contest"
            required
          />
        </div>
        <div className="input-pair">
          <label htmlFor="max-no-of-participants">
            Max Number of Contestants:
          </label>
          <input
            type="number"
            min={0}
            max={10}
            ref={pollTitleRef}
            name="name-of-contest"
            required
          />
        </div>
        <Button color="green">Create</Button>
      </motion.form>
    </div>
  );
};

export default EnterContest;
