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

    address[] public candidates;
    Proposal[] public proposals;
    mapping(address => bool) hasVoted;
    uint public totalNoOfVotes;
    mapping(address => bool) hasEntered;

    function enterCampaign (string memory props, string memory name) public {
        require(!hasEntered[msg.sender]);
        require(candidates.length < 5);

        Proposal memory newProposal = Proposal({
            proposal: props,
            name: name,
            nominee: msg.sender,
            hasEntered: true,
            noOfVotes: 0
        });

        proposals.push(newProposal);
        candidates.push(msg.sender);
        hasEntered[msg.sender] = true;
    }

    function vote (uint index) public {
        require(!hasEntered[msg.sender]);
        require(!hasVoted[msg.sender]);

        Proposal storage proposal = proposals[index];
        proposal.noOfVotes++;
        totalNoOfVotes++;
        hasVoted[msg.sender] = true;
    }

    function getIndexOfWinner () public view returns (uint) {
        uint largest = 0;
        uint index;
        for (uint i = 0; i < proposals.length; i++) {
            if(proposals[index].noOfVotes > largest) {
                largest = proposals[i].noOfVotes;
                index = i;
            }
        }

        return index;
    }
}