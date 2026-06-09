import http.server
import socketserver

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

Handler = MyHTTPRequestHandler
Handler.extensions_map.update({
    '.yml': 'text/yaml',
    '.yaml': 'text/yaml',
})

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
