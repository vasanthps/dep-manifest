# dep-manifest

dep-manifest is a license manifest generator to include all your npm and/or bower dependencies


### Installation

You need to install it globally

```sh
$ npm install -g dep-manifest
```

### Running

Move to your project root folder and run dep-manifest in the command line
```sh
$ cd my_project_dir
$ dep-manifest
```
A manifest.html report will be generated in your project root

You can also run dep-manifest with multiple options
(optional) Only include npm dependencies in the report:
```sh
$ dep-manifest --npm
```
(optional) Only includes bower dependencies in the report:
```sh
$ dep-manifest --bower
```

(optional) Generates output report in the specified path:
```sh
$ dep-manifest --output=reports/licenses.html
```
Please check the sample.html for an example report generated using this tool

