import socket
from urllib.request import urlopen

# host = socket.gethostbyname("www.rafigeorge.com")
host = "127.0.0.1"
port = 1337

print(socket.gethostbyname("www.rafigeorge.com"))

def setupServer():
    # create socket
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print("Socket created")
    try:
        s.bind((host, port))
        print("Socket bind complete")
    except socket.error as msg:
        print(msg)
    return s

def setupConnection():
    s.listen(1) # Allows one connection at a time
    conn, address = s.accept()
  #  connstream = ssl.wrap_socket(conn, server_side=True, cerfile="server.crt", keyfile="server.key")
    print("Connected to: " + address[0] + ":" + str(address[1]))
    return conn

def dataTransfer(conn):
    url = "https://api.instagram.com/v1/users/201262345/?access_token=201262345.3af8d79.74976cd65f5749128754a9208c3c7d97"
    info = urlopen(url).read()
    # loop to send and receive data
    while True:
        # print(info)

        # Receive the data
        data = conn.recv(1024) # buffer size
        data = data.decode('utf-8')
        # Split the data such the you separate the command
        # from teh rest of the data
        dataLines = data.split('\n', 1)
        dataMessage = dataLines[0].split(' ', 1)
        print(info)
        # Send reply back to client
        conn.sendall(info)
    conn.close()

s = setupServer()

while True:
    try:
        conn = setupConnection()
        dataTransfer(conn)
    except:
        break
