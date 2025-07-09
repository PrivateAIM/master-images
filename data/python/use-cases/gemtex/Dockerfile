FROM python:3.11
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip

RUN pip3 install -r /tmp/requirements.txt

RUN touch nltk_downloads.py

RUN echo 'import nltk\nnltk.download("punkt_tab")' >> nltk_downloads.py

RUN python3 nltk_downloads.py

RUN pip3 install git+https://github.com/PrivateAIM/flame-patterns.git@v0.2.4
