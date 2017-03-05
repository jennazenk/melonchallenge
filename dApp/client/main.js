import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//User infos from metamask
var userAddress = web3.eth.accounts[0];
web3.eth.getBalance(userAddress, function(err, res) {
        if (!err) {
            Session.set('balance', web3.fromWei(res, "ether").toNumber() + " ETH");
        } else {
            console.log(err);
        }
    })

//instantiation of contract Exchange Protocol
var untitled_exchangeprotocolContract = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getOffer", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLastOfferId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "isActive", "outputs": [{ "name": "active", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getOwner", "outputs": [{ "name": "owner", "type": "address" }], "payable": false, "type": "function" }]);
var exchangeProtocolContract = untitled_exchangeprotocolContract.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614");

// Get last offer id and second last offer id
exchangeProtocolContract.getLastOfferId(function(err, res) {
    if (!err) {
        Session.set('lastOfferId', res.toNumber());
        Session.set('secondLastId', res.toNumber() - 1);
    } else {
        console.log("error", err);
    }
});

//LAST OFFER 
// #555 isActive()
exchangeProtocolContract.isActive(Session.get('lastOfferId'), function(err, res) {
    if (!err) {
        Session.set('isActive1', res);
    } else {
        console.log("error", err);
    }
});

/// #554 isActive()
exchangeProtocolContract.isActive("554", function(err, res) {
    if (!err) {
        Session.set('isActive2', res);
    } else {
        console.log("error", err);
    }
});

//#555 getOwner()
exchangeProtocolContract.getOwner("555", function(err, res) {
    if (!err) {
        Session.set('getOwner1', res);
    } else {
        console.log("error", err);
    }
});

//#554 getOwner()
exchangeProtocolContract.getOwner("554", function(err, res) {
    if (!err) {
        Session.set('getOwner2', res);
    } else {
        console.log("error", err);
    }
});

// #555 getOffer()
exchangeProtocolContract.getOffer("555", function(err, res) {
    if (!err) {
        Session.set('getOffer', res);
        Session.set('buyQty', res[2] / (Math.pow(10, 18)));
        Session.set('sellToken', res[1]);
        Session.set('sellQty', res[0] / (Math.pow(10, 8)));

    } else {
        console.log("error", err);
    }
});

//Instanciation of asset contract at the address of buy token to retrieve the name of token
var untitled1_assetContract = web3.eth.contract([{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getSymbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getName", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "totalSupply", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getDecimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_decimals", "type": "uint256" }], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }]);
var assetContractBuy = untitled1_assetContract.at("0xb5f354c280fe7e559237ea7b3b56ae220ef0b801");

//Using asset contract to get the buy token name
assetContractBuy.name(function(err, name) {
    Session.set('buyToken', name);
})

//Instanciation of asset contract at the address of sell token
var untitled1_assetContract = web3.eth.contract([{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getSymbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getName", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "totalSupply", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getDecimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_decimals", "type": "uint256" }], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }]);
var assetContractSell = untitled1_assetContract.at("0xc652820b99552127d1e06373d8640e0f93da9477");

//Using asset contract to get the sell token name
assetContractSell.name(function(err, name) {
    Session.set('sellToken', name);
})


Template.offers.helpers({
    'account': function() {
        return web3.eth.accounts;
    },
    'balance': function() {
        return Session.get('balance');
    },
    'exchange': function() {
        return exchangeProtocolContract;
    },
    'lastId': function() {
        return Session.get('lastOfferId');
    },
    'secondLastId': function() {
        return Session.get('secondLastId');
    },
    'active1': function() {
        return Session.get('isActive1');
    },
    'active2': function() {
        return Session.get('isActive2');
    },
    'owner1': function() {
        return Session.get('getOwner1')
    },
    'owner2': function() {
        return Session.get('getOwner2')
    },
    'buyToken': function() {
        return Session.get('buyToken');
    },
    'buyQty': function() {
        return Session.get('buyQty');
    },
    'sellToken': function() {
        return Session.get('sellToken');
    },
    'sellQty': function() {
        return Session.get('sellQty');
    }
})
