import websocket
import json
API_KEY = "xq6gPNFojFs2jvc4UPA6c85OqH2SleDh"
# WS_URL = f"wss://api.xchangeapi.com/websocket/live?api-key={API_KEY}"
# 'wss://api.xchangeapi.com/websocket/live?api-key'
WS_URL = "wss://api.xchangeapi.com/websocket/live?api-key=Rz59df6eFuIBzSRSV6tXdtUa5lIU7YId"

def on_open(ws):
	print("OPEN")
	ws.send(json.dumps({"pairs": ["USDINR", "EURUSD"]}))

def on_close(ws, code, msg):
	print("CLOSE")

def on_error(ws, e):
	print(f"ERROR: {e}")

def on_message(ws, msg):
	print(msg)

ws = websocket.WebSocketApp(WS_URL, on_open=on_open, on_message=on_message, on_error=on_error, on_close=on_close)
ws.run_forever()