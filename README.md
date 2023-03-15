<!-- Essay On React Component, Props and State -->

# React Docs

React is a Javascript library for building user interfaces.
In react, everything is built in terms of components. Component is a self-contained
piece of UI, which can be reused across the application.

    Components:

    A components can be either class-bases or funtion-based.
    Class-bases components use the 'class' systax and the 'react.component' class.
    Function-bases component are defined as Javascript functions.


    Props and state are two important concepts
    in React that are used to manage data and communicate between components.


    Props:

    Probs are passed down to a child compnent as an object and are accessed
    using dot notation. If a patens component passes the prop 'name' to a child
    components, the child can be access usint 'this.props.name' in class-based component
    or 'props.name in a function-based component.


    State:

    State are used to anage date within a component and it can be modified within a component.
    When modified, React will re-render the component and any child component that depens on the state.
    State is defined is a class-based component using 'constuctor' method.

<!-- Mern Documentation -->

    # mern-stack-example

Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)

## How To Run

Create an Atlas URI connection parameter in `mern/server/config.env` with your Atlas URI:

```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=5000
```

Start server:

```
cd mern/server
npm install
npm start
```

Start Web server

```
cd mern/client
npm install
npm start
```

## Disclaimer

Use at your own risk; not a supported MongoDB product
