FROM continuumio/miniconda3

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY conda.yml /tmp/conda.yml

# Create and execute conda envs via .yaml and add env name to image.json execution command as arg
RUN conda env create -f /tmp/conda.yml


# Not working example:
## RUN echo "conda activate use-case-1" >> ~/.bashrc
## SHELL ["/bin/bash", "--login", "-c"]
