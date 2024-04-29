//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract VoteEvent {

    struct Candidate{
        string name;
        string description;
        uint256 votes;
    }

    struct Voter{
        address voter;
        bool voted;
    }

    address public immutable owner;
    string public name;
    string public description;
    bool public complete;
    uint256 deadline;

    Candidate[] public candidates;
    address[] public voters;
    mapping(address => bool) hasVoted;

    // Event to log voting event creation
    event VotingEventCreated(
        address indexed creator,
        uint256 indexed deadline
    );
    constructor(address _owner){
        owner = _owner;
    }

    // Function to create a new campaign
    function createVotingEvent(
        string memory _name,
        string memory _description,
        uint _deadline

    ) public {
        name = _name;
        description= _description;
        complete = false;
        deadline =  deadline;
        emit VotingEventCreated(msg.sender, _deadline);
    }

    function addVoter(
        address _voter
    ) public{
        voters.push(_voter);
        hasVoted[_voter] = false;
    }

    function addCandidate(
        string memory _name,
        string memory _description
    ) public{
        Candidate memory newCandidate = Candidate({
            name: _name,
            description: _description,
            votes: 0
        });
        candidates.push(newCandidate);
    }
    function areEqual(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    function vote(string memory candidateName) public {
        for(uint i = 0; i<candidates.length; i++){
            string memory _name = candidates[i].name;
            if (areEqual(_name, candidateName)){
                candidates[i].votes ++;
            }
        }
    }
    function getVoters() public view returns(address[] memory){
        return voters;
    }

    function getCandidates() public view returns(Candidate[] memory){
        return candidates;
    }

}

