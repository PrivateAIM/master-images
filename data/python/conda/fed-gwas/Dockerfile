FROM continuumio/miniconda3


RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
      apt-get install -yqq \
      git \
      python3 \
      python3-pip \
      python-is-python3

COPY conda.yml /tmp/conda.yml

COPY requirements.txt /tmp/requirements.txt

COPY startup.sh /app/startup.sh

RUN chmod +x /app/startup.sh

RUN conda env create -n ppgwas -f /tmp/conda.yml

# RUN echo "conda activate ppgwas" > ~/.bashrc

# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "ppgwas", "/bin/bash", "-c"]

RUN python3 -m pip install --upgrade pip

RUN python3 -m pip install uv

RUN uv pip install -r /tmp/requirements.txt --system

RUN uv pip install git+https://github.com/PrivateAIM/flame-patterns.git@0.3.1 --system

ENV PATH=/opt/conda/envs/ppgwas/bin:$PATH

ENTRYPOINT ["/app/startup.sh"]
