/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { waitForModemStream } from 'docken';
import type { ModemStreamWaitOptions, ScanResultItem } from 'docken';
import path from 'node:path';
import tar from 'tar-fs';
import type { Config } from '../../../config';
import { SCAN_IMAGE_PATH } from '../../../constants';
import { useDockerClient } from '../client';
import { buildImageURL } from '../utils';

export async function buildImage(context: {
    config: Config,
    image: ScanResultItem,
    options?: ModemStreamWaitOptions
}) {
    const imageURL = await buildImageURL(context);

    const imageFilePath : string = path.join(SCAN_IMAGE_PATH, context.image.path);

    const pack = tar.pack(imageFilePath);

    const docker = useDockerClient();
    const stream = await docker.buildImage(pack, {
        t: imageURL,
    });

    await waitForModemStream(docker.modem, stream, context.options);
}

export async function buildImages(context: {
    images: ScanResultItem[],
    config: Config,
    options?: ModemStreamWaitOptions
}) {
    const promises: Promise<any>[] = [];

    for (let i = 0; i < context.images.length; i++) {
        promises.push(buildImage({
            config: context.config,
            image: context.images[i],
            options: context.options,
        }));
    }

    await Promise.all(promises);
}
