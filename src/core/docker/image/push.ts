/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { ModemStreamWaitOptions, ScanResultItem } from 'docken';
import { waitForModemStream } from 'docken';
import type { AuthConfig } from 'dockerode';
import type { Config } from '../../../config';
import { useDockerClient } from '../client';
import { buildImageURL } from '../utils';

export async function pushImage(context: {
    image: ScanResultItem,
    config: Config,
    options?: ModemStreamWaitOptions
}) {
    const imageURL = await buildImageURL(context);

    const docker = useDockerClient();
    const image = docker.getImage(imageURL);

    let authConfig : AuthConfig | undefined;

    if (
        context.config.has('registryUser') &&
        context.config.has('registryPassword')
    ) {
        authConfig = {
            serveraddress: context.config.get('registryHost') as string,
            username: context.config.get('registryUser') as string,
            password: context.config.get('registryPassword') as string,
        };
    }

    const stream = await image.push({
        authconfig: authConfig,
    });

    return waitForModemStream(docker.modem, stream, context.options);
}

export async function pushImages(context: {
    images: ScanResultItem[],
    config: Config,
    options?: ModemStreamWaitOptions
}) {
    const promises: Promise<any>[] = [];

    for (let i = 0; i < context.images.length; i++) {
        promises.push(pushImage({
            image: context.images[i],
            config: context.config,
            options: context.options,
        }));
    }

    await Promise.all(promises);
}
