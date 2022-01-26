import Web3 from 'web3'
import { networks } from './const.js'

const bscMain = new Web3(networks.bsc_main)
const bscTest = new Web3(networks.bsc_test)

let count = 0
const checkEvents = async (contract, event, fromBlock, toBlock) => {
  try {
    const tmp = await contract.getPastEvents(event, { fromBlock, toBlock }, (err, events) => events)
    count = 0
    return tmp
  } catch (err) {
    // console.error(`Error in getEvents`)
    // console.error(err)
    count++
    if (count >= 12) {
      count = 0
      throw new Error('Too many failed getEvents')
    } else {
      return await checkEvents(contract, event, fromBlock, toBlock)
    }
  }
}

export const checkInitialAcquisition = async (chainId, contract, event) => {
  if (chainId === 'BSC_MAIN') {
    const latestBlock = await bscMain.eth.getBlockNumber()
    console.log('latestBlock', latestBlock)
    let result = []
    for (let idx = 14330551; idx < latestBlock; idx += 5000) {
      const temp = await checkEvents(contract, event, idx, idx + 5000)
      result = [...result, ...temp]
      console.log(temp)
    }
    // // const recipients = result.map((event) => event.returnValues.nbuRecipient)
    // // const uniqueRecipients = Array.from(new Set(recipients))
    // return uniqueRecipients
    // console.log('result', result)
    return result
  } else {
    return await checkEvents(contract, event, 'earliest', 'latest').then((events) => {
      const recipients = events.map((event) => event.returnValues.nbuRecipient)
      const uniqueRecipients = Array.from(new Set(recipients))
      return uniqueRecipients
    })
  }
}

export default checkInitialAcquisition
