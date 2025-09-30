FROM continuumio/anaconda3

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
      apt-get install -yqq \
      git \
      python3 \
      python3-pip \
      python-is-python3 \
      samtools \
      fastqc && \
     rm -rf /var/lib/apt/lists/*

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip

RUN pip3 install -r /tmp/requirements.txt

RUN pip3 install git+https://github.com/PrivateAIM/flame-patterns.git@0.3.0


RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq
