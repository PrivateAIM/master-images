import docker
import os
import typing
import os.path
from dotenv import load_dotenv, find_dotenv


def build_images():
    client = docker.from_env()
    registry = os.getenv("CONTAINER_REGISTRY")
    process_docker_image_dir("./language", client, registry)
    process_docker_image_dir("./custom", client, registry)


def process_docker_image_dir(directory, client, registry):
    sub_directories = scandir(directory)

    for sub_dir in sub_directories:
        if "Dockerfile" in os.listdir(sub_dir):
            repository_parts = sub_dir.split(os.sep)[2:]
            repository_name = "/".join(repository_parts)
            repository_name = registry + "/master/" + repository_name
            build_path = os.path.abspath(sub_dir)

            print(f"Building image <{repository_name}> at path <{build_path}>")
            image, logs = client.images.build(path=build_path, tag=repository_name + ":latest")
            for item in logs:
                print(item)
            # push the image to the registry
            result = client.api.push(repository=repository_name, tag="latest")
            print(result)


def scandir(start_dir) -> typing.List[typing.Tuple[str, str]]:
    subfolders = [f.path for f in os.scandir(start_dir) if f.is_dir()]
    for dir in list(subfolders):
        subfolders.extend(scandir(dir))
    return subfolders


if __name__ == '__main__':
    load_dotenv(find_dotenv())
    build_images()
