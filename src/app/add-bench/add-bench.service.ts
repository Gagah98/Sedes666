import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BenchRequest } from '../models/bench-request';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AddBenchService {
    constructor(private http: HttpClient) { }

    postBench(benchRequest: BenchRequest) {
        const postBenchUrl = `${environment.apiUrl}/benches`;
        return this.http.post(postBenchUrl, benchRequest)

    }

}