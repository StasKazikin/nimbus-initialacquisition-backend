import Web3 from 'web3'
import abiEth from './abi/abiEth.json'
import abiBsc from './abi/abiBsc.json'
import snakeEggsShopABI from './abi/snakeEggsShopABI.json'
import { networks, contracts } from './const.js'
import checkInitialAcquisition from './CheckInitialAcquisition.js'

const ETH_MAIN = new Web3(networks.eth_main)
const ETH_TEST = new Web3(networks.eth_test)
const BSC_MAIN = new Web3(networks.bsc_main)
const BSC_TEST = new Web3(networks.bsc_test)

const contractEthMain = new ETH_MAIN.eth.Contract(abiEth, contracts.eth_contract)
const contractEthTest = new ETH_TEST.eth.Contract(abiEth, contracts.eth_contract)
const contractBscMain = new BSC_MAIN.eth.Contract(abiBsc, contracts.bnb_contract)
const contractBscTest = new BSC_TEST.eth.Contract(abiBsc, contracts.bnb_contract)
const contractEggShopBscTest = new BSC_TEST.eth.Contract(snakeEggsShopABI, contracts.egg_shop_contract)

const wallet1 = '0x5888c09B825Fb9DE54A675896A991E953814e9cC'
const wallet2 = '0x85b4Ce35C2e36aC6405455A3D3Ae947972864f66'
const wallet3 = '0x9D4F30511DE410F9cC2d1A299ABf7984d267F062'
const walletNew = '0xC56fb60320D5Ca2D428B6BEb1442638c4872Af8E'

// checkInitialAcquisition('ETH_TEST', contractEthTest, 'BuyNbuForToken').then((arr) =>
//   console.log(arr.includes(walletNew))
// )
// checkInitialAcquisition('BSC_MAIN', contractBscMain, 'BuyNbuForToken').then((arr) => console.log(arr))
checkInitialAcquisition('BSC_TEST', contractEggShopBscTest, 'BuyEgg').then((arr) => console.log(arr))
