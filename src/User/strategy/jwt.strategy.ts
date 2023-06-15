import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { Users } from "../users.entity";
import { InjectRepository } from "@nestjs/typeorm";
//import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt',) {
  constructor(config: ConfigService, @InjectRepository(Users)
  private readonly userRepository: Repository<Users>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload : {sub:string}){

    console.log("apna payload", payload);

    // const user = await this.userRepository.findOne({})

   
    // delete user.new_hash

    //if(!user){
     // throw new UnauthorizedException();
    //}
    // return user
   return payload;
 
  }
}