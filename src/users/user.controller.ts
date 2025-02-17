import { Body, Controller, Get, Patch, Post, Put } from "@nestjs/common";

import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";

import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

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

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: string) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: string) {
    return this.userService.updatePartial(id, data);
  }
}
