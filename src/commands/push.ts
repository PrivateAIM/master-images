/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { CAC } from 'cac';
import { consola } from 'consola';
import { scanDirectory } from 'docken';
import { createConfig } from '../config';
import { SCAN_IMAGE_PATH } from '../constants';
import { pushImage, pushImages } from '../core';
import { isNewLineCharacter, removeNewLineCharacter } from '../utils';
import type { CLICommandOptions } from './type';
import { applyCLICommandOptions, setCLICommandOptions } from './utils';

export function registerCLIPushCommand(cli: CAC) {
    const command = cli
        .command('push [dir]', 'Push image(s)');

    setCLICommandOptions(command);

    command
        .action(async (
            image: string | undefined,
            options: CLICommandOptions,
        ) => {
            const config = await createConfig(options.root);

            applyCLICommandOptions(config, options);

            if (!config.has('registryHost')) {
                consola.error('Registry host must be defined.');
                process.exit(1);
            }

            const scanResult = await scanDirectory(SCAN_IMAGE_PATH);
            if (image) {
                const index = scanResult.images.findIndex(
                    (el) => el.virtualPath === image,
                );
                if (index === -1) {
                    consola.warn(`Image ${image} could not be found.`);
                    process.exit(1);
                }

                await pushImage({
                    config,
                    image: scanResult.images[index],
                    options: {
                        onPushing(progress) {
                            consola.info(`Step ${progress.current}/${progress.total} (${progress.percent}%)`);
                        },
                        onStreamChunk(chunk) {
                            if (isNewLineCharacter(chunk.stream)) {
                                return;
                            }

                            consola.debug(removeNewLineCharacter(chunk.stream));
                        },
                    },
                });
                return;
            }

            await pushImages({
                config,
                images: scanResult.images,
                options: {
                    onPushing(progress) {
                        consola.info(`Pushing ${progress.current}/${progress.total}bytes (${progress.percent}%)`);
                    },
                    onStreamChunk(chunk) {
                        if (isNewLineCharacter(chunk.stream)) {
                            return;
                        }

                        consola.debug(removeNewLineCharacter(chunk.stream));
                    },
                },
            });
        });
}
