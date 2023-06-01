import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { TokenMetadataStandard } from '@shared/models/metadata.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {

  private ipfsAuth: string;
  private ipfsClient: IPFSHTTPClient;

  constructor(
    private http: HttpClient
  ) {
    this.ipfsAuth = 'Basic ' + Buffer.from(environment.infura.projectId + ':' + environment.infura.projectSecret).toString('base64');
    this.ipfsClient = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: this.ipfsAuth,
      },
    });
  }

  addBufferFile(dataBuffer: Buffer) {
    return this.ipfsClient.add(dataBuffer);
  }

  addJsonFile(objectContent: TokenMetadataStandard) {
    return this.ipfsClient.add(JSON.stringify(objectContent));
  }

  getFile(hash: string): Promise<any> {
    return this.http.get(`https://gateway.ipfscdn.io/ipfs/${hash}`).toPromise();
  }

}
