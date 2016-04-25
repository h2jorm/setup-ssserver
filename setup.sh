#!/bin/bash

printHelp() {
  echo "
  --ip        IP address of ssserver
  --port      Ssserver port
  --password  Ssserver password
  "
}

while [ "$1" != "" ];
do
  case "$1" in
    --ip ) IP=$2;shift 2;;
    --port ) PORT=$2;shift 2;;
    --password ) PASS=$2;shift 2;;
    --help ) echo "$(printHelp)";exit 0;;

    * ) break;;
  esac
done

if [ -z $IP ]
then
  echo "invalid ip(use --ip)"
  exit 1
fi

if [ -z $PORT ]
then
  echo "invalid port(use --port)"
  exit 1
fi

if [ -z $PASS ]
then
  echo "invalid password(use --password)"
  exit 1
fi

apt-get update

apt-get install -y python-pip
pip install shadowsocks

CONFIG="/etc/shadowsocks.json"

cat > $CONFIG <<END
{
  "server": "$IP",
  "server_port": $PORT,
  "local_address": "127.0.0.1",
  "local_port": 1080,
  "password": "$PASS",
  "timeout": 300,
  "method": "aes-256-cfb",
  "fast_open": false
}
END

ssserver -c /etc/shadowsocks.json -d start
