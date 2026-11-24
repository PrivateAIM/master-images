FROM python:3.12

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git libx11-6 libxrender1

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip

RUN pip3 install -r /tmp/requirements.txt

RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@1.2.1
