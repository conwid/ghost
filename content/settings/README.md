# Content / Settings

### routes.yaml

<<<<<<< HEAD
<!-- TODO: make a better description here and link to the docs -->
=======
To find out more about `routes.yaml` configuration and how to use it visit [documentation](https://ghost.org/docs/api/handlebars-themes/routing/).
>>>>>>> newversion/master

This is how the default `routes.yaml` file looks like:

```yaml
routes:

collections:
  /:
    permalink: '/{slug}/'
    template:
      - index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```
