FROM continuumio/miniconda3

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY conda.yml /tmp/conda.yml

# Create and execute conda envs via .yaml and add env name to image.json execution command as arg
RUN conda env create -f /tmp/conda.yml

# now install flame into the env (activation doesn't persist across RUN layers)
RUN conda run -n use-case-1 pip install git+https://github.com/PrivateAIM/python-sdk-patterns.git@1.2.1

# Not working example:
## RUN echo "conda activate use-case-1" >> ~/.bashrc
## SHELL ["/bin/bash", "--login", "-c"]