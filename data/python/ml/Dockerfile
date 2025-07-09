FROM python:3.9

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY requirements.txt /tmp/requirements.txt

RUN pip3 install -r /tmp/requirements.txt

RUN pip3 install git+https://github.com/PrivateAIM/flame-patterns.git@v0.2.4
