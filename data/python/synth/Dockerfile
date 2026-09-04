FROM python:3.10

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip
RUN pip3 install -r /tmp/requirements.txt

# python-sdk-patterns 0.6.5 pins opendp to <0.13.0, but smartnoise-synth
# requires opendp >=0.14 internally. Install patterns with --no-deps so
# its opendp pin does not override the version smartnoise-synth pulls.
RUN pip3 install git+https://github.com/PrivateAIM/python-sdk.git@0.6.0
RUN pip3 install --no-deps git+https://github.com/PrivateAIM/python-sdk-patterns.git@0.7.1
