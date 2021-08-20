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
