import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
  pattern = {
    email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
    password: '[A-Za-z0-9]{6,14}' // Minimum 6 and max 14 characters
  };
  constructor() { }

}
