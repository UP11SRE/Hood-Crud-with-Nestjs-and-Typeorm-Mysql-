import { Injectable, NotFoundException } from "@nestjs/common";
import { createUserDto } from "./createUserDto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import * as bcrypt from "bcrypt";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { NOTFOUND } from "dns";



@Injectable()

export class UserService{  

constructor(private jwt : JwtService, private config: ConfigService,@InjectRepository(Users) private readonly userRepository: Repository<Users>){}

async userSignUp(dto : createUserDto){

   const {email, password} = dto;

   const hash = await bcrypt.hash(password,10);

    const user =  this.userRepository.create({
        email,
        password : hash
    }
    );

    await this.userRepository.save(user);

    console.log(user);

    delete user.password;
    return user;


    }    

async login(dto : createUserDto) {
    
   const {email, password} = dto;

    const result = await this.userRepository.findOne({where : {email : email} })

    if(!result){
        throw new NotFoundException('NOT FOUND');


    }

    return  this.generateToken(dto);

}



async generateToken(dto : createUserDto) : Promise<{access_token : string}> {

        const {email} = dto;
       const payload = {sub: email}

       const token = await this.jwt.signAsync(payload, {
        expiresIn : '1d',
        secret : this.config.get('JWT_SECRET')
       })

       

       console.log('apna token', token);
       return {
        access_token : token,
    }
    }




    

}


