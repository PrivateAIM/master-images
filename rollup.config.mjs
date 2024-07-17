/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import resolve from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
import { builtinModules } from 'node:module';
import fs from "node:fs";

const extensions = [
    '.js', '.mjs', '.cjs', '.ts', '.mts', '.cts'
];

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), {encoding: 'utf-8'}));
const external = Object.keys(pkg.dependencies || {})
    .concat(Object.keys(pkg.peerDependencies || {}))
    .concat(builtinModules)

export default [
    {
    input: 'src/index.ts',
    external,
    output: [
        {
            format: 'cjs',
            file: pkg.main,
            exports: 'named',
            sourcemap: true
        },
        {
            format: 'es',
            file: pkg.module,
            sourcemap: true
        }
    ],
    plugins: [
        // Allows node_modules resolution
        resolve({ extensions}),

        // Compile TypeScript/JavaScript files
        swc()
    ]
    },
    {
        input: 'src/cli.ts',
        external,
        output: [
            {
                format: 'cjs',
                file: pkg.bin,
                exports: 'named',
                sourcemap: true
            }
        ],
        plugins: [
            // Allows node_modules resolution
            resolve({ extensions}),

            // Compile TypeScript/JavaScript files
            swc()
        ]
    }
]
