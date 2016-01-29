import logging
import sys


class StdoutStreamHandler(logging.StreamHandler):

    def __init__(self, stream=None):
        """
        Initialize the handler.

        If stream is not specified, sys.stderr is used.
        """
        super(StdoutStreamHandler, self).__init__(self)
        if stream is None:
            stream = sys.stdout
        self.stream = stream
