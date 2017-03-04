import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//     // counter starts at 0
//     this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//     counter() {
//         return Template.instance().counter.get();
//     },
// });

// Template.hello.events({
//     'click button' (event, instance) {
//         // increment the counter when button is clicked
//         // instance.counter.set(instance.counter.get() + 1);

// var untitled_exchangeprotocolContract = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getOffer", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLastOfferId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "isActive", "outputs": [{ "name": "active", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getOwner", "outputs": [{ "name": "owner", "type": "address" }], "payable": false, "type": "function" }]);
// var untitled_exchangeprotocol = untitled_exchangeprotocolContract.new({
//     from: web3.eth.accounts[0],
//     data: '0x6060604052341561000c57fe5b5b61020d8061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634579268a1461005c57806359e148fc146100fd57806382afd23b14610123578063c41a360a1461015b575bfe5b341561006457fe5b61007a60048080359060200190919050506101bb565b604051808581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200194505050505060405180910390f35b341561010557fe5b61010d6101cb565b6040518082815260200191505060405180910390f35b341561012b57fe5b61014160048080359060200190919050506101d1565b604051808215151515815260200191505060405180910390f35b341561016357fe5b61017960048080359060200190919050506101d9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006000600060005b9193509193565b60005b90565b60005b919050565b60005b9190505600a165627a7a723058201f8461f70d67d9840b0bf1eb3c02c99531b3bb7b5b7895b461694b41e8a385280029',
//     gas: '4700000'
// }, function(e, contract) {
//     console.log(e, contract);
//     // if (typeof contract.address !== 'undefined') {
//     	instance.counter.set('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//     // }
// })

//     },
// });




//instantiation of contract Exchange Protocol
var untitled_exchangeprotocolContract = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getOffer", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLastOfferId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "isActive", "outputs": [{ "name": "active", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getOwner", "outputs": [{ "name": "owner", "type": "address" }], "payable": false, "type": "function" }]);
var exchangeProtocolContract = untitled_exchangeprotocolContract.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614");



// Get last offer id
exchangeProtocolContract.getLastOfferId(function(err, res) {
    if (!err) {
        Session.set('lastOfferId', res.toNumber());
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

//#555 getOwner()
exchangeProtocolContract.getOwner("555", function(err, res) {
    if (!err) {
        Session.set('getOwner', res);
    } else {
        console.log("error", err);
    }
});

// #555 getOffer()
exchangeProtocolContract.getOffer("555", function(err, res) {
    if (!err) {
        console.log("Outside getOffer", res);
        Session.set('getOffer', res);
        Session.set('buyPrice', res[2]/(Math.pow(10, 18)));
        Session.set('sellToken', res[1]);
        Session.set('sellPrice', res[0]/(Math.pow(10, 8)));

    } else {
        console.log("error", err);
    }
});

//instanciation of asset contract at the address of buy token to retrieve the name of token
var untitled1_assetContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getSymbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getDecimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]);
var assetContractBuy = untitled1_assetContract.at("0xb5f354c280fe7e559237ea7b3b56ae220ef0b801");

assetContractBuy.name(function(err, name) {
    Session.set('buyToken', name);
})

//instanciation of asset contract at the address of sell token
var untitled1_assetContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getSymbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getDecimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]);
var assetContractSell = untitled1_assetContract.at("0xc652820b99552127d1e06373d8640e0f93da9477");

assetContractSell.name(function(err, name) {
    Session.set('sellToken', name);
})


Template.offer1.helpers({
    'account': function() {
        // return web3.eth.accounts;
        return Template.instance().account;
    },
    'exchange': function() {
        console.log('Exchange protocol', exchangeProtocolContract);
        return exchangeProtocolContract;
    },
    'id': function() {
        return Session.get('lastOfferId');
    },
    'isActive': function() {
         return Session.get('isActive1');
    },
    'owner': function() {
        return Session.get('getOwner')
    },
    'getOffer': function() {
    	console.log('Inside helpers getOffer with SET', Session.get('getOffer'));
    	return Session.get('getOffer');
    },
    'buyToken': function() {
        return Session.get('buyToken');
    },
    'buyPrice': function() {
        return Session.get('buyPrice');
    },
    'sellToken': function() {
        return Session.get('sellToken');
    },
    'sellPrice': function() {
        return Session.get('sellPrice');
    }
})
