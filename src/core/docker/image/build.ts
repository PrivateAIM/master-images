/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { waitForModemStream } from 'docken';
import type { Meta } from 'docken';
import path from 'node:path';
import tar from 'tar-fs';
import type { Config } from '../../../config';
import { SCAN_IMAGE_PATH } from '../../../constants';
import { useDockerDaemon } from '../daemon';
import { buildImageURL } from '../utils';
import type { ImageHooks } from './type';

export async function buildImage(context: {
    config: Config,
    image: Meta,
    hooks?: ImageHooks
}) {
    const imageURL = await buildImageURL(context);

    const imageFilePath : string = path.join(SCAN_IMAGE_PATH, context.image.path);

    const pack = tar.pack(imageFilePath);

    const docker = useDockerDaemon();
    const stream = await docker.buildImage(pack, {
        t: imageURL,
    });

    await waitForModemStream(docker.modem, stream, {
        onProgress: (res) => {
            if (context.hooks && context.hooks.onProgress) {
                context.hooks.onProgress(res);
            }
        },
    });

    if (context.hooks && context.hooks.onCompleted) {
        context.hooks.onCompleted();
    }
}
export async function buildImages(context: {
    images: Meta[],
    config: Config,
    hooks?: ImageHooks
}) {
    const promises: Promise<any>[] = [];

    for (let i = 0; i < context.images.length; i++) {
        promises.push(buildImage({
            config: context.config,
            image: context.images[i],
            hooks: context.hooks,
        }));
    }

    await Promise.all(promises);
}
