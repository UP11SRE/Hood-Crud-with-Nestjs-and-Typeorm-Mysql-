import { Module } from "@nestjs/common";
import Redis from "ioredis";

@Module({
    providers: [
        {
          provide: 'REDIS_CLIENT',
          useFactory: () => {
            return new Redis({
              host: 'localhost', // Redis server host
              port: 6379, // Redis server port
              
            });

        //    // const ttl = 10;
        //     redisClient.setWithTTL = async (key: string, value: string, ttl: number) => {
        //         await redisClient.set(key, value, 'EX', ttl);
        //       };
        //       return redisClient;


          },
        },
      ],
      exports: ['REDIS_CLIENT'],
})

export class redisModule{}