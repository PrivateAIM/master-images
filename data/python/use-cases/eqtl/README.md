# The image for cis-eQTL analysis

Prebuilt Python 3 image with dependencies required for launching eQTL pipeline:

- python
    - uv
    - numpy
    - pandas
    - scikit-learn
    - torch
    - tensorqtl
    - matplotlib
    - pysam
    - scipy
    - tqdm
- pip
- samtools


To run the image using gpus enter the following command:
```bash
docker run -it --rm -v local_dir:container_dir <registry>/master/eqtl:latest
```
