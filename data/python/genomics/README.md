# Genomics Image

Prebuilt python 3 image with several commonly used genomics libraries and tools installed:

- python
    - numpy
    - pandas
    - scikit-learn
    - miniFasta
    - biopython
- pip
- samtools
- JRE
- FastQC



To run the image using gpus use:
```shell
docker run -it --rm -v local_dir:container_dir <registry>/master/genomics:latest
```
