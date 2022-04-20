import { eth, getInstance, web3Obj } from "./provider";

import UserStorage from "./artifacts/UserStorage.json";
import UserController from "./artifacts/UserController.json";

export const getUserInfo = async (userId) => {
	const storage = await getInstance(UserStorage);
	const profile = await storage.profiles.call(userId);

	const { id, username, firstName, lastName, bio, gravatarEmail } = profile;

	if (!parseInt(id)) throw "Couldn't find user!";

	return {
		id: parseInt(id),
		username: web3Obj.utils.toAscii(username).replace(/\u0000/g, ""),
		firstName: web3Obj.utils.toAscii(firstName).replace(/\u0000/g, ""),
		lastName: web3Obj.utils.toAscii(lastName).replace(/\u0000/g, ""),
		bio,
		gravatarEmail,
	};
};

export const getLoggedInUserId = async () => {
	try {
		await ethereum.enable();
		const addresses = await eth.getAccounts();

		if (!addresses) return;

		const storage = await getInstance(UserStorage);
		const userId = await storage.addresses.call(addresses[0]);

		return parseInt(userId);
	} catch (err) {
		console.error("Err:", err);
	}
};

export const createUser = async (...params) => {
	try {
		await ethereum.enable();

		const controller = await getInstance(UserController);
		const addresses = await eth.getAccounts();

		const result = await controller.createUser(...params, {
			from: addresses[0],
		});

		return result;
	} catch (err) {
		console.error("Err:", err);
	}
};
