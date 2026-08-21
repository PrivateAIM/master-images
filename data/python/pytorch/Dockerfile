FROM nvidia/cuda:13.3.1-cudnn-runtime-ubuntu26.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
      apt-get install -yqq \
      git \
      python3 \
      python3-pip \
      python-is-python3 && \
     rm -rf /var/lib/apt/lists/*

# Ubuntu 26.04 ships Python 3.14 as an externally-managed (PEP 668) install,
# which makes a plain "pip install" fail. Install into the system interpreter
# anyway - NOT a venv - so analyses invoked as /usr/bin/python (an absolute
# path, which ignores PATH) still find these packages. Kept as an ENV so
# images built FROM this base can pip install without repeating the flag.
ENV PIP_BREAK_SYSTEM_PACKAGES=1

COPY requirements.txt /tmp/requirements.txt

# --ignore-installed: the distro pip is dpkg-managed and has no RECORD file,
# so pip refuses to uninstall it. Install the new pip alongside it into
# /usr/local/... instead, which takes precedence on sys.path and PATH.
RUN python3 -m pip install --upgrade --ignore-installed pip

RUN pip3 install -r /tmp/requirements.txt

RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@0.6.5
