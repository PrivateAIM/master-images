FROM python:3.10
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip

RUN pip3 install -r /tmp/requirements.txt


RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@16a2ad9f962b25a859b3a3c2bba0c19be6d460ec
