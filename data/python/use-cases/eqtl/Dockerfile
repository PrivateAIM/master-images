FROM python:3.11
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
      apt-get install -yqq \
      git \
      python3 \
      python3-pip \
      python-is-python3 \
      samtools

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip

RUN python3 -m pip install uv

RUN uv pip install -r /tmp/requirements.txt --system

RUN uv pip install git+https://github.com/PrivateAIM/python-sdk-patterns.git@0.4.2.1 --system
