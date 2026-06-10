# Python synthetic-data image

Prebuilt Python 3 image for generating and auditing privacy-preserving
synthetic data in federated analyses. Includes:

- [smartnoise-synth](https://github.com/opendp/smartnoise-sdk):
  differentially private synthesizers (MWEM-PGM, AIM, DP-CTGAN), built
  on OpenDP and uses pytorch as transitive dependency
- [anonymeter](https://github.com/statice/anonymeter): privacy risk
  evaluation for synthetic data (singling-out, linkability, inference
  attacks)
- pandas, numpy, scikit-learn

