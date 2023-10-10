def domain_name(url):
    if url.startswith("http://"):
        url = url[7:]
    elif url.startswith("https://"):
        url = url[8:]

    parts = url.split("/")

    domain = parts[0]

    if domain.startswith("www."):
        domain = domain[4:]

    domain_parts = domain.split(".")
    if len(domain_parts) > 1:
        domain = domain_parts[0]

    return domain