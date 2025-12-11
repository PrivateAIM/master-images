/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Client } from 'docken';
import { createClient } from 'docken';

let instance : Client | undefined;
export function useDockerClient() : Client {
    if (typeof instance !== 'undefined') {
        return instance;
    }

    instance = createClient();

    return instance;
}
