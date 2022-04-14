import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Constants } from "./constants";

@Controller({
    path: "",
    version: Constants.API_VERSION_1
})
export class AppController {

    constructor(private readonly appService: AppService) { }

    @Get()
    async getData() {
        return await this.appService.getData();
    }
}
