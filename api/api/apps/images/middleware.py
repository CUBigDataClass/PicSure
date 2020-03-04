class AllowFromAnywhereMiddleware:
    """ Middleware that allows any web based client to interface with this api by setting the 
        "Access-Control-Allow-Origin" header to "*".
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response["Access-Control-Allow-Origin"] = "*"
        return response
