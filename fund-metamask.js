const receiver = "0xF01eD9d2602E24eb29ea95C4c0B105352DA5fA7A";
const amount = web3.utils.toWei("10", "ether");

module.exports = async function (callback) {
	const addresses = await web3.eth.getAccounts();

	web3.eth.sendTransaction(
		{
			from: addresses[1],
			to: receiver,
			value: amount,
		},
		callback
	);
};
