/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { createServer } from 'node:http';
import {
    Router, coreHandler, createNodeDispatcher, send,
} from 'routup';
import { createJsonHandler } from '@routup/body';
import { spawnCLIProcess } from '../../commands/utils';
import type { Config } from '../../config';
import { verifyWebhookRequestSignature } from './verify';

export async function serveWebhook(
    config: Config,
) : Promise<void> {
    const router = new Router();

    const execute = async () => {
        await spawnCLIProcess(config, 'build');
        await spawnCLIProcess(config, 'push');
    };

    router.use(createJsonHandler());

    router.use('/', coreHandler(async (req, res) => {
        if (!verifyWebhookRequestSignature(req, config)) {
            res.statusCode = 400;

            return send(res, {
                success: false,
                message: 'The request signature could not be detected or verified.',
            });
        }

        await execute();

        return send(res, { success: true });
    }));

    const server = createServer(createNodeDispatcher(router));

    server.listen(config.get('port'));
}
