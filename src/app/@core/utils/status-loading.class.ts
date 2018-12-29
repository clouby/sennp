import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { tap, merge, finalize } from 'rxjs/operators';


@Injectable()
export class StatusLoading {
    private loading: BehaviorSubject<boolean>;
    public test = [];

    constructor() {
        this.loading = new BehaviorSubject<boolean>(false);
    }

    push(name) {
        this.test.push(name);
    }

    get load() {
        return new StatusLoading();
    }

    reset_load = () => {
        this.loading.next(true);
    }

    end_load = () => {
        this.loading.next(false);
    }

    get g_loading() {
        return this.loading;
    }

    set s_loading(data: boolean) {
        this.loading.next(data);
    }

    toggle_loading() {
        const load = !this.loading.getValue();
        this.loading.next(load);
    }

    loading_request(observable: Observable<any>): Observable<any> {
        return of({})
            .pipe(
                tap(this.reset_load),
                merge(observable),
                finalize(this.end_load),
            );
    }

}