// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VotingBallot {
    struct Proposal {
        string proposal;
        string name;
        address nominee;
        bool hasEntered;
        uint noOfVotes;
    }

    string public nameOfContest;
    address public organizer;
    address[] public candidates;
    address[] public traitorArr;
    Proposal[] public proposals;
    mapping(address => bool) public hasRegistered;
    mapping(address => bool) public hasVoted;
    uint public totalNoOfVotes;
    mapping(address => bool) hasEntered;
    bool public isContestOver;

    constructor (string memory contestName) {
        nameOfContest = contestName;
        organizer = msg.sender;
    }

    modifier contestOngoing {
        require(isContestOver = false);
        _;
    }

    function enterCampaign (string memory props, string memory name, bool traitor) public contestOngoing {
        require(!hasEntered[msg.sender]);
        require(candidates.length <= 5);

        Proposal memory newProposal = Proposal({
            proposal: props,
            name: name,
            nominee: msg.sender,
            hasEntered: true,
            noOfVotes: 0
        });

        if(traitor == true) {
            require(traitorArr.length < 1);
            traitorArr.push(msg.sender);
        } 

        proposals.push(newProposal);
        candidates.push(msg.sender);
        hasEntered[msg.sender] = true;
    }

    function vote (uint index) public contestOngoing {
        require(!hasEntered[msg.sender]);
        require(!hasVoted[msg.sender]);

        Proposal storage proposal = proposals[index];
        proposal.noOfVotes++;
        totalNoOfVotes++;
        hasVoted[msg.sender] = true;
    }

    function getIndexOfWinner () public contestOngoing returns (uint) {
        uint largest = 0;
        uint index;
        for (uint i = 0; i < proposals.length; i++) {
            if(proposals[index].noOfVotes > largest) {
                largest = proposals[i].noOfVotes;
                index = i;
            }
        }
        isContestOver = true;
        return index;
    }

    function getTraitor () public view returns (address) {
        return traitorArr[0];
    }
}