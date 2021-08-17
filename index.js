import Web3 from 'web3'
import abiEth from './abi/abiEth.json'
import abiBsc from './abi/abiBsc.json'
import { networks, contracts } from './const.js'

const ETH_MAIN = new Web3(networks.eth_main)
const ETH_TEST = new Web3(networks.eth_test)
const BSC_MAIN = new Web3(networks.bsc_main)
const BSC_TEST = new Web3(networks.bsc_test)

// const addressEth = '0xEEA92913d8AA554a102ED5B4F0A6206E6D8d59D5'
// const addressBnb = '0xb99f831a0a17ecD4221c907714B44A1931446832'

const contractEthMain = new ETH_MAIN.eth.Contract(abiEth, contracts.eth_contract)
const contractEthTest = new ETH_TEST.eth.Contract(abiEth, contracts.eth_contract)
const contractBscMain = new BSC_MAIN.eth.Contract(abiBsc, contracts.bnb_contract)
const contractBscTest = new BSC_TEST.eth.Contract(abiBsc, contracts.bnb_contract)

let wallet = '0x85b4Ce35C2e36aC6405455A3D3Ae947972864f66'

const check = async (contract, event, fromBlock, toBlock) => {
  let recipients = []
  let uniqueRecipients = []

  await contract.getPastEvents(event, { fromBlock, toBlock }, (err, events) => {
    for (let i = 0; i < events.length; i++) {
      // console.log(events[i].returnValues.nbuRecipient)
      recipients.push(events[i].returnValues.nbuRecipient)
    }
    // console.log(recipients)
    uniqueRecipients = Array.from(new Set(recipients))
  })
  // console.log(uniqueRecipients);
  return uniqueRecipients
}

// check(contractEthMain, 'BuyNbuForToken', 'earliest', 'latest').then((uniqueRecipients) =>
//   console.log(uniqueRecipients.includes(wallet))
// )
// check(contractEthMain, 'BuyNbuForEth', 'earliest', 'latest').then((uniqueRecipients) =>
//   console.log(uniqueRecipients.includes(wallet))
// )
// check(contractEthTest, 'BuyNbuForToken', 'earliest', 'latest').then((uniqueRecipients) =>
//   console.log(uniqueRecipients.includes(wallet))
// )
// check(contractEthTest, 'BuyNbuForEth', 'earliest', 'latest').then((uniqueRecipients) =>
//   console.log(uniqueRecipients.includes(wallet))
// )
// check(contractEthTest, 'BuyNbuForEth', 0, 'latest').then((uniqueRecipients) =>
//   console.log(uniqueRecipients)
// )

async function filterEvents(contract, event, filter, startBlock) {
  if (NETWORK === 'bnb_main') {
    const latestBlock = await web3.eth.getBlockNumber()
    let result = []
    const step = 5000
    for (let i = startBlock; i < latestBlock + step; i += step) {
      const tmp = await getEventsFromTo(contract, event, filter, i, i + step)
      result = [...result, ...tmp]
    }

    return result
  } else {
    return await contract.getPastEvents(event, {
      filter,
      fromBlock: startBlock,
      toBlock: 'latest',
    })
  }
}

let count = 0
async function getEventsFromTo(contract, event, filter, start, end) {
  try {
    const tmp = await contract.getPastEvents(event, {
      filter,
      fromBlock: start,
      toBlock: end,
    })
    count = 0
    return tmp
  } catch (err) {
    console.error(`Error in getEvents`)
    console.error(err)
    count++
    if (count >= 25) {
      count = 0
      throw new Error('Too many failed getEvents')
    } else {
      return await getEventsFromTo(contract, event, filter, start, end)
    }
  }
}

const checkInitialAcquisition = async (network, contract, event) => {
  const latestBlock = await network.eth.getBlockNumber()
  let recipients = []
  let fullRecipients = []
  let uniqueRecipients = []
  console.log(latestBlock)
  for (let idx = 0; idx <= latestBlock + 4990; idx = idx + 4990) {
    const buyCrypto = async (contract, event, fromBlock, toBlock) => {
      await contract.getPastEvents(event, { fromBlock, toBlock }, (err, events) => {
        for (let i = 0; i < events.length; i++) {
          // console.log(events[i].returnValues.nbuRecipient)
          recipients.push(events[i].returnValues.nbuRecipient)
        }
        uniqueRecipients = Array.from(new Set(recipients))
        // console.log('recipients', recipients)
      })
      // console.log('uniqueRecipients', uniqueRecipients)
      return uniqueRecipients
    }
    return buyCrypto(contract, event, 'earliest', 'latest').then((uniqueRecipients) => {
      console.log(uniqueRecipients.includes(wallet))
      // fullRecipients = [...fullRecipients, ...uniqueRecipients]
      // console.log('fullRecipients', fullRecipients)
    })
  }
}

checkInitialAcquisition(ETH_TEST, contractEthTest, 'BuyNbuForToken')
// checkInitialAcquisition(contractEthTest, 'BuyNbuForToken').then(console.log)
// checkInitialAcquisition(BSC_TEST, contractBscTest, 'BuyNbuForToken').then(console.log)
