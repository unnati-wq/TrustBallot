//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./VoteEvent.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract EventFactory {

    struct Candidate {
        string name;
        string description;
        uint256 votes;
    }

    address[] deployedEvents;
    mapping(address => address) eventOwner;

    function createEvent(string memory name, string memory description, uint time, address[] memory voters) public{
        address newEvent = address(new VoteEvent(msg.sender));
        eventOwner[msg.sender] = newEvent;
        deployedEvents.push(newEvent);
        VoteEvent(newEvent).createVotingEvent(name, description, time, voters);
    }

    function addVoters(address voter) public{
        VoteEvent(eventOwner[msg.sender]).addVoter(voter);
    }

    function addCandidates(string memory name, string memory description) public{
        VoteEvent(eventOwner[msg.sender]).addCandidate(name, description);
    }

    function getDeployedEvents() public view returns(address[] memory){
        return deployedEvents;
    }

    function getVoters() public view returns(address[] memory){
        return VoteEvent(eventOwner[msg.sender]).getVoters();
    }

    function getCandidates() public view returns(VoteEvent.Candidate[] memory){
        return VoteEvent(eventOwner[msg.sender]).getCandidates();
    }

    function vote(string memory _name) public{
        VoteEvent(eventOwner[msg.sender]).vote(_name);
    }

}
