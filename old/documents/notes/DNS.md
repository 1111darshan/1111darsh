# [DNS](https://youtu.be/9nCIjLlLVzY)

ping 192.168.1.11
ping db

---
cat >> /etc/host

192.168.1.11 db

192.168.1.11 www.google.com

---
ping db
ssh db

cat /etc/resolve.conf

nameserver 192.168.1.100


