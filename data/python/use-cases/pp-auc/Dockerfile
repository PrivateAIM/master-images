FROM continuumio/anaconda3

ARG DEBIAN_FRONTEND=noninteractive

# Update system and install only essential packages
RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq \
      git \
      python3 \
      python3-pip \
      python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt /tmp/requirements.txt

# Upgrade pip
RUN python3 -m pip install --upgrade pip

# Install Python dependencies for FHE-based AUC computation
RUN pip3 install -r /tmp/requirements.txt

# Install FLAME patterns library
RUN pip3 install git+https://github.com/PrivateAIM/flame-patterns.git@0.5.0
