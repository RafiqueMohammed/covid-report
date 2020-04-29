import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

interface Script {
    src: string;
    loaded: boolean;
}

@Injectable()
export class ScriptLoaderService {

    onLoad$: BehaviorSubject<String> = new BehaviorSubject('');
    constructor(@Inject(DOCUMENT) private document) {


    }

    public _scripts: Script[] = [];

    /**
     * @deprecated
     * @param tag
     * @param {string} scripts
     * @returns {Promise<any[]>}
     */
    load(tag, ...scripts: string[]) {
        scripts.forEach((src: string) => {
            if (!this._scripts[src]) {
                this._scripts[src] = { src: src, loaded: false };
            }
        });

        const promises: any[] = [];
        scripts.forEach((src) => promises.push(this.loadScript(tag, src)));

        return Promise.all(promises);
    }

    /**
     * Lazy load list of scripts
     * @param tag
     * @param scripts
     * @param loadOnce
     * @returns {Promise<any[]>}
     */
    loadScripts(tag, scripts, loadOnce?: boolean) {
        loadOnce = loadOnce || false;

        scripts.forEach((script: string) => {
            if (!this._scripts[script]) {
                this._scripts[script] = { src: script, loaded: false };
            }
        });

        const promises: any[] = [];
        scripts.forEach(
            (script) => promises.push(this.loadScript(tag, script, loadOnce)));

        return Promise.all(promises);
    }

    /**
     * Lazy load a single script
     * @param tag
     * @param {string} src
     * @param loadOnce
     * @returns {Promise<any>}
     */
    loadScript(tag, src: string, loadOnce?: boolean) {
        loadOnce = loadOnce || false;
        const tagEl = this.document.getElementsByTagName(tag)[0];

        if (!this._scripts[src]) {
            this._scripts[src] = { src: src, loaded: false };
        }

        return new Promise((resolve, reject) => {
            // resolve if already loaded
            if (this._scripts[src].loaded && loadOnce) {
                resolve({ src: src, loaded: true });
            } else {
                // load script tag
                const scriptTag = this.document.createElement('script');
                scriptTag.type = 'text/javascript';
                scriptTag.src = this._scripts[src].src;
                scriptTag.onload = () => {
                    this.onLoad$.next(this._scripts[src].src);
                };
                tagEl.appendChild(scriptTag);

                this._scripts[src] = { src: src, loaded: true };
                resolve({ src: src, loaded: true });
            }
        });
    }
    loadStyles(tag, src) {
        const tagEl = this.document.getElementsByTagName(tag)[0];
        if (Array.isArray(src)) {
            src.forEach((k, s) => {
                const _tag = this.document.createElement('link');
                _tag.href = k;
                _tag.rel = 'stylesheet';
                _tag.type = 'text/css';
                tagEl.appendChild(_tag);
            });
        } else {
            const _tag = this.document.createElement('link');
            _tag.href = src;
            _tag.rel = 'stylesheet';
            _tag.type = 'text/css';
            tagEl.appendChild(_tag);
        }
    }
}
