FROM python:3.10
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

RUN python3 -m pip install --upgrade pip

RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@0.4.2.1
