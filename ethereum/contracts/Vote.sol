// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VotingBallot {
    struct Proposal {
        string proposal;
        string name;
        address candidateAddress;
        bool hasEntered;
        uint noOfVotes;
    }

    string public nameOfContest;
    address public organizer;
    address[] private candidates;
    address[] private traitorArr;
    Proposal[] public proposals;
    mapping(address => bool) public hasRegistered;
    mapping(address => bool) public hasVoted;
    uint public totalNoOfVotes;
    address[] private winners; // Made a dynamic array in case there's a tie
    mapping(address => bool) hasEntered;
    bool public isContestOver;

    constructor (string memory contestName) {
        nameOfContest = contestName;
        organizer = msg.sender;
        isContestOver = false;
    }

    modifier contestOngoing {
        // modifier for certain actions to be performed only when the contest is still on
        require(isContestOver == false);
        _;
    }

    function enterCampaign (string memory props, string memory name, bool traitor) public contestOngoing {
        require(!hasEntered[msg.sender]);
        require(candidates.length <= 5);

        Proposal memory newProposal = Proposal({
            proposal: props,
            name: name,
            candidateAddress: msg.sender,
            hasEntered: true,
            noOfVotes: 0
        });

        if(traitor == true) {
            require(traitorArr.length < 1); // only one traitor allowed
            traitorArr.push(msg.sender);
        } 

        proposals.push(newProposal);
        candidates.push(msg.sender);
        hasEntered[msg.sender] = true;
    }

    function vote (uint index) public contestOngoing {
        require(!hasVoted[msg.sender]);
        require(proposals[index].candidateAddress != msg.sender); // You can't vote for yourself
        Proposal storage proposal = proposals[index];
        proposal.noOfVotes++;
        totalNoOfVotes++;
        hasVoted[msg.sender] = true;
    }

    function getWinner () public returns (address[] memory) {
        // returns an array of addresses in case there's a tie
        uint largest = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if(proposals[i].noOfVotes >= largest) {
                winners.push(proposals[i].candidateAddress);
            }
        }
        isContestOver = true;
        return winners;
    }

    function getTraitor () public view returns (address) {
        require(isContestOver == true);
        return traitorArr[0];
    }
}
