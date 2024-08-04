import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
	constructor() {
		this.client = createClient();
		this.client.on('error', (error) => {
			console.log(`Redis client not connected to server: ${error}`);
		});
	}

	isAlive() {
		return this.client.connected;
	}

	async get(key) {
		return promisify(this.client.GET).bind(this.client)(key);
	}
	
	async set(key, value, duration) {
		await promisify(this.client.SETEX)
			.bind(this.client)(key, duration, value);
	}

	async del(key) {
		await promisify(this.client.DEL).bind(this.client)(key);
	}
}

export const redisClient = new RedisClient();
export default redisClient;
