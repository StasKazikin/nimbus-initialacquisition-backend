import Web3 from 'web3'
import abiEth from './abi/abiEth.json'
import abiBsc from './abi/abiBsc.json'
import { networks } from './const.js'

const ETH_MAIN = new Web3(networks.eth_main)
const ETH_TEST = new Web3(networks.eth_test)
const BSC_MAIN = new Web3(networks.bsc_main)
const BSC_TEST = new Web3(networks.bsc_test)

const addressEth = '0xEEA92913d8AA554a102ED5B4F0A6206E6D8d59D5'
const addressBnb = '0xb99f831a0a17ecD4221c907714B44A1931446832'

const contractEthMain = new ETH_MAIN.eth.Contract(abiEth, addressEth)
const contractEthTest = new ETH_TEST.eth.Contract(abiEth, addressEth)
const contractBscMain = new BSC_MAIN.eth.Contract(abiBsc, addressBnb)
const contractBscTest = new BSC_TEST.eth.Contract(abiBsc, addressBnb)

let nbuRecipients = []

const BuyNbuForToken = (contract) => {
  contract.getPastEvents(
    'BuyNbuForToken',
    {
      fromBlock: 0,
      toBlock: 'latest',
    },
    (err, events) => {
      let recipients = []
      for (let i = 0; i < events.length; i++) {
        // console.log(events[i].returnValues.nbuRecipient)
        recipients.push(events[i].returnValues.nbuRecipient)
      }
      const uniqueRecipients = Array.from(new Set(recipients))
      console.log('uniqueRecipients', uniqueRecipients)
    }
  )
}

const BuyNbuForEth = (contract) => {
  contract.getPastEvents(
    'BuyNbuForEth',
    {
      fromBlock: 0,
      toBlock: 'latest',
    },
    (err, events) => {
      let recipients = []
      for (let i = 0; i < events.length; i++) {
        // console.log(events[i].returnValues.nbuRecipient)
        recipients.push(events[i].returnValues.nbuRecipient)
      }
      const uniqueRecipients = Array.from(new Set(recipients))
      console.log('uniqueRecipients', uniqueRecipients)
    }
  )
}

const BuyNbuForBnb = (contract) => {
  contract.getPastEvents(
    'BuyNbuForBnb',
    {
      fromBlock: 0,
      toBlock: 'latest',
    },
    (err, events) => {
      console.log(events)
      let recipients = []
      for (let i = 0; i < events.length; i++) {
        // console.log(events[i].returnValues.nbuRecipient)
        recipients.push(events[i].returnValues.nbuRecipient)
      }
      const uniqueRecipients = Array.from(new Set(recipients))
      console.log('uniqueRecipients', uniqueRecipients)
    }
  )
}

BuyNbuForToken(contractEthMain)
BuyNbuForToken(contractEthTest)
BuyNbuForEth(contractEthMain)
BuyNbuForEth(contractEthTest)

BuyNbuForBnb(contractBscMain)
