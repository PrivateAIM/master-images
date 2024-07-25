FROM python:3.11

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY requirements.txt /tmp/requirements.txt

RUN pip3 install -r /tmp/requirements.txt

#
RUN git clone https://github.com/PrivateAIM/python-sdk.git
# move flame to the working directory
RUN mv python-sdk/flame ./
# move resources to the working directory
RUN mv python-sdk/resources ./



EXPOSE 8080

# get the
