FROM python:3.11
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip

RUN pip3 install -r /tmp/requirements.txt

RUN python3 -c """
import nltk
nltk.download('punkt_tab')
"""

RUN pip3 install git+https://github.com/PrivateAIM/flame-patterns.git@817e342aacf2cc1b3ba8e4d420d444271e25e0cf
