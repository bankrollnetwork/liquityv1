// SPDX-License-Identifier: MIT

pragma solidity 0.6.11;

import "../Interfaces/IERC20.sol";
import "../Dependencies/BaseMath.sol";
import "../Dependencies/Ownable.sol";
import "../Dependencies/CheckContract.sol";
import "../Dependencies/SafeMath.sol";
import "../Dependencies/ReentrancyGuard.sol";

contract LiquidityDrive is ReentrancyGuard, Ownable, CheckContract, BaseMath  {
    using SafeMath for uint256;

    //FAIR LAUNCH
    uint256 public totalEthDonated;
    mapping (address => uint256) private _ethDonated;
    mapping (address => uint256) private _claimed;
    uint256 public totalClaimableTokens;
    uint256 public totalClaimedTokens;
    uint256 public endedOn;
    uint256 private estimatedPercentageOfSupply;
    uint256 public immutable campaignPeriod;
    uint256 public immutable startedOn;

    IERC20 public token; 

    uint256 public participants;
    uint256 public totalTxs;

    event LiquidityDonation(
        address from,
        uint256 donation
    );

    event TokenClaim(
        address from,
        uint256 tokens
    );

    event Started (
        uint256 startedOn
    );

    event Ended (
        uint256 endedOn
    );

    event DriveDistributed (
        uint256 totalEthDonated,
        uint256 totalClaimableTokens,
        address destination
    );


    modifier notLaunched {
        require(endedOn == 0, "Token already succcessfully launched");
        _;
    }

    

    constructor (IERC20 _token, uint256 _estimatedPercentageOfSupply, uint256 _campaignPeriod) public {
        require(_estimatedPercentageOfSupply > 0 && _estimatedPercentageOfSupply <= 35, "estimate not in range");
        require(campaignPeriod > 300, "campaign period must be greater than 5 minutes"); 

        //get a handle on the token
        token = _token;

        //claimable will use an estimate until the drive is over
        estimatedPercentageOfSupply = _estimatedPercentageOfSupply;

        //Initialize the campaign period
        campaignPeriod = _campaignPeriod;

    }

     /**
     * @dev Receive function to handle ETH that was send straight to the contract
     */
    receive() external payable {
        require(false, "Do not send funds directly to this contract");
    }


    function  donate() nonReentrant notLaunched external payable  returns (uint256) {
        
        require(startedOn > 0, "Liquidity drive has not started");
        require(msg.value >= 0.01 ether, "Minimum donation is 0.01");

        address _sender = _msgSender();
        uint256 _value = msg.value;

        //track participants
        if (_ethDonated[_sender] == 0) {
            participants = participants.add(1);
        }
        
        //add donation
        _ethDonated[_sender] = _ethDonated[_sender].add(_value);
        totalEthDonated = totalEthDonated.add(_value);

        emit LiquidityDonation(_sender, _value);

        totalTxs = totalTxs.add(1);

    }

    

    function  claim() nonReentrant external returns (uint256) {
        require(endedOn > 0, "Token not launched yet");
        
        address _sender = _msgSender();

        //check if there are tokens to claim
        require(_ethDonated[_sender] > 0, "No donations made prior to launch");
        require(_claimed[_sender] == 0, "This account has already claimed tokens");

        uint256 tokens = availableOf(_sender);
        _claimed[_sender] = tokens;

        //Send the tokens
        token.transfer(_sender, tokens);

        emit TokenClaim(_sender, tokens);

        totalClaimedTokens = totalClaimedTokens.add(tokens);

        totalTxs = totalTxs.add(1);

    } 

    function start () onlyOwner notLaunched external {
        require(startedOn == 0, "Token already launched");
        require(token.balanceOf(address(this)) > 0, "Tokens must be transfered to the drive before it can be started");

        startedOn = block.timestamp;

        emit Started(startedOn);
    }

    // Allows anyone to release tokens after the campaign period has ended
    function launch() notLaunched external {
        require(startedOn > 0, "Liquidity drive has not started");

         //how long has the liquidity drive been running
        uint256 lapsed = block.timestamp.sub(startedOn);
        require(lapsed > campaignPeriod, "After campaign period has ended anyone can launch the token. Try later");

        //end the drive and distriuted raised funds
        _end();

    }

    function _end() internal {
        require(token.balanceOf(address(this)) > 0, "Tokens must be transfered to the drive before it can be ended");

    
        //donations will no longer be processed
        endedOn = block.timestamp;

        //Finalize the amount of tokens to be distributed
        totalClaimableTokens = token.balanceOf(address(this));

        //transfer eth funds to administrator
        payable(owner()).transfer(address(this).balance);

        emit DriveDistributed(totalEthDonated, totalClaimableTokens, owner());

        emit Ended(endedOn);
    }

    function donationsOf(address from) public view returns (uint256) {
        return  _ethDonated[from]; 
    }

    function availableOf(address from) public view returns (uint256) {
        uint256 totalTokens = (totalClaimableTokens > 0) ? totalClaimableTokens : token.totalSupply().mul(estimatedPercentageOfSupply).div(100);
        return (totalEthDonated > 0) ? totalTokens.mul(_ethDonated[from]).div(totalEthDonated) : 0;
    }

    function claimedOf(address from) public view returns (uint256) {
        return _claimed[from];
    }

    function ready() public view returns (bool status, uint256 lapsed) {
        //how long has the liquidity drive been running
        lapsed = block.timestamp.sub(startedOn);

        status = lapsed > _campaignPeriod; 
    }

}