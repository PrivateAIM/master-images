FROM python:3.10
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip

RUN pip3 install -r /tmp/requirements.txt


RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@afdc79d2cec4577456c5b59c87af02b0faf6b6ba

