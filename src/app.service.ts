import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHome(): string {
    return "<p color='blue'> Home </p>";
  }
}

/*


  PostService
  Will Communicate with DB

  expose functions like
  Post(message,) 
*/