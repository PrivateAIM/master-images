FROM continuumio/miniconda3

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY conda.yml /tmp/conda.yml

RUN conda env create -f /tmp/conda.yml

#RUN echo "conda activate use-case-1" >> ~/.bashrc
#SHELL ["/bin/bash", "--login", "-c"]
