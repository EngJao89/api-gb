import { Body, Controller, Get, Post } from "@nestjs/common";

import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";

import { ParamId } from 'src/decorators/param-id.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async read() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: string) {
    return this.userService.show(id);
  }
}
