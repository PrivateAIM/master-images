FROM continuumio/miniconda3

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY conda.yml /tmp/conda.yml

RUN conda create -n use-case-1 && \
    conda activate use-case-1 && \
    conda env update -f conda.yml

RUN python3 -m pip install --upgrade pip && \
    pip3 install git+https://github.com/PrivateAIM/python-sdk.git@822aa858946f40172594c7fa6d399080fa23dcfd

