// // redis.service.ts
// import { Injectable } from '@nestjs/common';
// import Redis from 'ioredis';

// @Injectable()
// export class RedisService {
//   private redisClient: Redis.Redis;

//   constructor() {
//     this.redisClient = new Redis(); // Create a new Redis client instance
//   }

//   // Implement methods to interact with Redis
//   // For example:
//   async setValue(key: string, value: string): Promise<void> {
//     await this.redisClient.set(key, value);
//   }

//   async getValue(key: string): Promise<string | null> {
//     return this.redisClient.get(key);
//   }
// }
