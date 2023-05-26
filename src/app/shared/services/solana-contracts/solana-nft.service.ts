import { Injectable } from '@angular/core';
import { PhantomConnectService } from '@shared/services/phantom/phantom-connect.service';

@Injectable({
  providedIn: 'root',
})
export class SolanaNftService {

  constructor(
    private phantom: PhantomConnectService,
  ) {}

}
