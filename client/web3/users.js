import { eth, getInstance, web3Obj } from "./provider";

import UserStorage from "./artifacts/UserStorage.json";
import UserController from "./artifacts/UserController.json";

export const getUserInfo = async (userId) => {
	const storage = await getInstance(UserStorage);
	const { id, username } = await storage.profiles.call(userId);
	return {
		id: parseInt(id),
		username: web3Obj.utils.toAscii(username).replace(/\u0000/g, ""),
	};
};

export const createUser = async (username) => {
	const controller = await getInstance(UserController);

	try {
		await ethereum.enable();
		const addresses = await eth.getAccounts();

		const result = await controller.createUser(web3Obj.utils.fromAscii(username), {
			from: addresses[0],
		});

		return result;
	} catch (err) {
		console.error("Err:", err);
	}
};
