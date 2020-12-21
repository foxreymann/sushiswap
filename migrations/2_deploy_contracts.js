const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const WDEV = artifacts.require('WDEV.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
const SushiToken = artifacts.require('SushiToken.sol');
const SushiBar = artifacts.require('SushiBar.sol');
const SushiMaker = artifacts.require('SushiMaker.sol');

module.exports = async function(deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(WDEV);
  const wdev = await WDEV.deployed();
  const tokenA = await MockERC20.new('Token A', 'TKA', web3.utils.toWei('1000'));
  const tokenB = await MockERC20.new('Token B', 'TKB', web3.utils.toWei('1000'));

  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();
  await factory.createPair(wdev.address, tokenA.address);
  await factory.createPair(wdev.address, tokenB.address);
  await deployer.deploy(Router, factory.address, wdev.address);
  const router = await Router.deployed();

  await deployer.deploy(SushiToken);
  const sushiToken = await SushiToken.deployed();

  await deployer.deploy(SushiBar, sushiToken.address);
  const sushiBar = await SushiBar.deployed();

  await deployer.deploy(
    SushiMaker,
    factory.address, 
    sushiBar.address, 
    sushiToken.address, 
    wdev.address
  );
  const sushiMaker = await SushiMaker.deployed();
  await factory.setFeeTo(sushiMaker.address);

};
