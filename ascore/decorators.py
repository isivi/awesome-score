from functools import update_wrapper

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext


def with_template(arg):
    """
    with_template decorator: a quick replacement for render_to_response.

    As described here:
    http://marcinkaszynski.com/blog/index.php/2008/10/01/skroty-render_to_response/

    Rewritten by Tomasz Glowka to make it be compatible with method_decorator
    """
    def decorator(func):
        def decorated_func(request, *args, **kwargs):
            extra_context = kwargs.pop('extra_context', {})
            dictionary = {}
            ret = func(request, *args, **kwargs)
            if isinstance(ret, HttpResponse):
                return ret
            dictionary.update(ret)
            dictionary.update(extra_context)
            template_name = dictionary.get('template_name', default_template_name)
            return render_to_response(template_name, dictionary=dictionary,
                                      context_instance=RequestContext(request))
        update_wrapper(decorated_func, func)  # using python tool to emulate env gently
        return decorated_func

    # arg == wrapped function
    if not callable(arg):
        default_template_name = arg
        return decorator
    # arg is template
    else:
        app_name = re.search('([^.]+)[.]views', arg.__module__).group(1)
        # Deleted [ app_name, '/' ] from the list below, to make folder structure simpler
        default_template_name = ''.join([arg.__name__, '.html'])
        return decorator(arg)
