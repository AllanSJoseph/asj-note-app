import time
import socket
import sys

def wait_for_db(host, port):
    print(f"⏳ Waiting for database at {host}:{port}...")
    while True:
        try:
            sock = socket.create_connection((host, port), timeout=2)
            sock.close()
            print("✅ Database is up")
            return
        except socket.error:
            print("🔄 Still waiting...")
            time.sleep(1)

if __name__ == "__main__":
    host = "db"
    port = 5432
    wait_for_db(host, port)
    sys.exit(0)
