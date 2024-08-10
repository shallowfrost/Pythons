import os
import sys
from datetime import datetime
from urllib.parse import urlparse
from PyQt5.QtCore import QUrl
from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage

FILES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
LOG_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'output/win_output.log'))

class CustomWebEnginePage(QWebEnginePage):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.last_message = None
        self.log_file = open(LOG_FILE_PATH, 'a')

    def __del__(self):
        self.log_file.close()

    def write_log(self, message):
        print(message)  # Log to the console
        self.log_file.write(message + '\n')
        self.log_file.flush()

    def loadFinished(self):
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.write_log(f"window loaded: {current_time}")
        self.write_log("")

    def javaScriptConsoleMessage(self, level, message, line_number, source_id):
        # Parse the URL to get the path
        parsed_url = urlparse(source_id)
        source_path = os.path.relpath(parsed_url.path, FILES_DIR)
        short_path = '/'.join(source_path.split('\\')[-2:])
        
        log_message = ""
        if level == QWebEnginePage.InfoMessageLevel:
            log_message = f"{message}"
        elif level == QWebEnginePage.WarningMessageLevel:
            log_message = f"Warn: {message} ({short_path}:{line_number})"
        elif level == QWebEnginePage.ErrorMessageLevel:
            log_message = f"Err: {message} ({short_path}:{line_number})"
        else:
            log_message = f"JS: {message} ({short_path}:{line_number})"
        
        self.write_log(log_message)

        # Custom formatting for stack trace and avoiding duplicates
        if "Uncaught" in message:
            if message == self.last_message:
                return
            self.last_message = message
            log_message = f"{short_path}:{line_number}  {message}\n"
            self.write_log(log_message)
            # Print stack trace if available in message
            message_lines = message.split('\n')
            for line in message_lines[1:]:
                self.write_log(f"    {line}")

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Assembly Line")
        self.setWindowIcon(QIcon(os.path.join(FILES_DIR, 'assets/images/Icon.png')))
        self.resize(1322, 768)
        self.browser = QWebEngineView()
        self.browser.setPage(CustomWebEnginePage(self.browser))
        self.browser.setUrl(QUrl.fromLocalFile(os.path.join(FILES_DIR, "index.html")))
        self.setCentralWidget(self.browser)
        self.show()

if __name__ == "__main__":
    sys.argv.append('--disable-web-security')
    app = QApplication(sys.argv)
    window = MainWindow()
    sys.exit(app.exec_())
