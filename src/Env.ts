import dotenv from "dotenv";
import { Driver, Connection } from "db-conn";
import { GenericPool, GenericPoolConfig } from "db-conn-pool";
import { Sqlite3Driver } from "db-conn-sqlite3";

export class Env {
	protected driver: Driver;
	public constructor() {
		dotenv.config();
		const dbType = process.env.DB_TYPE;
		switch (dbType) {
			case "sqlite3":
				this.driver = new Sqlite3Driver();
				break;
		}
	}
	public getDriver(): Driver {
		return this.driver;
	}
	public async getConnection(): Promise<Connection> {
		let conn = await this.driver.connect(process.env.DB_URL);
		return conn;
	}
	public async getConnectionPool(): Promise<GenericPool> {
		const poolConfig: GenericPoolConfig = {
			min: 2,
			max: 5,
			testOnBorrow: false
		};
		const oConfig = process.env.DB_URL;
		const pool = new GenericPool(this.driver, oConfig, poolConfig);
		const oConn = await pool.getConnection();
		await oConn.close();
		return pool;
	}
}