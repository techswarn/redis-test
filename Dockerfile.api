FROM denoland/deno:1.42.1

# Install netcat
RUN apt update && apt install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# The port that your application listens to.
EXPOSE 3333

WORKDIR .

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
COPY ./import_map.json .
COPY ./api .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --import-map=import_map.json ./src/main.ts

CMD [ \
  "run", \
  "--allow-read", \
  "--allow-env", \
  "--allow-net", \
  "--unstable-cron", \
  "--unsafely-ignore-certificate-errors", \
  "--import-map=import_map.json", \
  "./src/main.ts" \
]
