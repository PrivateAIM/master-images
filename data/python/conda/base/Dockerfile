FROM continuumio/anaconda3

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq

RUN python3 -m pip install --upgrade pip

RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@0.4.1
