:: CA
openssl genrsa -out ca.key 2048
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -subj  "/C=KO/ST=Korea/L=Seoul/O=Example Ltd/OU=IT/CN=localhost"