FROM python:3.12

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git \
    unzip \
    curl \
    libgl1 \
 && rm -rf /var/lib/apt/lists/*

RUN mkdir -p src/models/

RUN curl -L "https://zenodo.org/record/5113483/files/public_bpr_model.zip?download=1" \
    -o tmp.zip && \
    unzip tmp.zip -d src/models && \
    rm tmp.zip

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip

RUN pip3 install -r /tmp/requirements.txt

RUN pip3 install git+https://github.com/PrivateAIM/flame-patterns.git@0.3.0
