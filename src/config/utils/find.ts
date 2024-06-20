/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { load, locateMany } from 'locter';
import { isObject, merge } from 'smob';
import type { OptionsInput } from '../type';

export async function loadOptions(path?: string) : Promise<OptionsInput> {
    const items : OptionsInput[] = [];

    const fileInfos = await locateMany('pht.config.{ts,cts,mts,cjs,mjs,js,json}', {
        path,
    });

    for (let i = 0; i < fileInfos.length; i++) {
        let data = await load(fileInfos[i]);
        if (data.default) {
            data = data.default;
        }
        if (isObject(data)) {
            items.push(data);
        }
    }

    return merge({}, ...items);
}
