#!/bin/bash
echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc
echo "conda activate ppgwas"  >> ~/.bashrc
/bin/bash -c "$@"
