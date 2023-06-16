import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./createUserDto";

@Controller('/users')

export class userController{

    constructor(private readonly userService: UserService) {}

//    @Post('/token')
//    generateToken(@Body() dto : createUserDto){
//     return this.userService.generateToken(dto);
//    }

   @Post('/signup')
   userSignUp(@Body() dto : createUserDto){
    return this.userService.userSignUp(dto);
   }

   @Post('/login')
   userLogin(@Body() dto : createUserDto){
    return this.userService.login(dto);
   }


}