import os

exts = ["yml", "json", "ts", "tsx", "py", "Makefile", "env", "local", "dockerignore"]
old_name = input("Find:")
new_name = input("Name:")
old_repo = input("Find repo:")
new_repo = input("New repo:")
exclude_dirs = ["env", ".env", "node_modules"]


def replace_in_file(path, old, new):
    with open(path, "r+") as h:
        content = h.read()
        h.seek(0)
        h.write(content.replace(old, new))
        h.truncate()
        print("Replaced in", path)


for root, dirs, files in os.walk(".", topdown=True):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]

    # rename filenames and folders
    for x in dirs + files:
        if old_name in x:
            old = os.path.join(root, x)
            new = os.path.join(root, x.replace(old_name, new_name))
            os.rename(old, new)
            print("Renamed", old, "->", new)

    # rename inside files
    for file in files:
        ext = file.split(".")[-1]

        if ext not in exts:
            continue

        path = os.path.join(root, file)

        replace_in_file(path, old_name, new_name)


repo_update_files = ["Makefile", "app.yml"]

for path in repo_update_files:
    replace_in_file(path, old_repo, new_repo)
