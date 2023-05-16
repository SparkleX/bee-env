import { Env } from "../Env.js";


test("test", async () => {
	const oEnv = new Env();
	await oEnv.getConnection();
});
