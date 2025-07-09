FROM nvcr.io/nvidia/tensorflow:23.06-tf2-py3

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq

RUN pip3 install git+https://github.com/PrivateAIM/flame-patterns.git@v0.2.4
