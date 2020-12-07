import socket
from json import dumps
from encrypt import writeToJSONFile
from chunks import recv_timeout

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 65432        # Port to listen on (non-privileged ports are > 1023)

m = {"id": 2, "name": "abc"} # a real dict
json = dumps(m)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(8192)
            if not data:
                break
            #conn.sendall(data)
            conn.sendall(bytes(writeToJSONFile(),encoding="utf-8"))
print("finishd")

