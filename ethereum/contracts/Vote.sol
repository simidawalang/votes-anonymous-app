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
    mapping(address => bool) hasEntered;

    function enterCampaign (string memory props, string memory name) public {
        require(!hasEntered[msg.sender]);

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
    }
}