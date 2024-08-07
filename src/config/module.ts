/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { getPort } from 'get-port-please';
import { getPackageJsonVersionTag } from '../utils';
import type { Config } from './type';
import { buildConfig, readConfig } from './utils';

let instance : Config | undefined;

export async function createConfig(directoryPath?: string) : Promise<Config> {
    if (typeof instance !== 'undefined') {
        return instance;
    }

    const input = await readConfig(directoryPath);
    instance = buildConfig(input);

    // find open port
    if (!instance.has('port')) {
        const port = await getPort();
        instance.set('port', port);
    }

    if (!instance.has('tag')) {
        const tag = await getPackageJsonVersionTag();
        instance.set('tag', tag);
    }

    return instance;
}
